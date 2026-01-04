import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const file = formData.get("cv") as File | null;

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !process.env.MAIL_TO) {
      return new Response("Email not configured", { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const attachments = [];

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    await transporter.sendMail({
      from: `"ION Talent Website" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: "New CV / Contact Submission",
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      attachments,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to send email", { status: 500 });
  }
}
