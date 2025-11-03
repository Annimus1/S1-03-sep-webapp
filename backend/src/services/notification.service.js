// /src/middlewares/notificationService.js
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const NotificationService = {
  /**
   *Envio de email genérico
   */
  async sendEmail({ to, subject, html, text = 'Mensaje de Kredia' }) {
    const msg = {
      to,
      from: 'krediawebapp@gmail.com',
      subject,
      text,
      html
    };

    // Fire-and-forget: no bloquea el controller
    sgMail
      .send(msg)
      .then(() => console.log(`Email enviado a ${to}`))
      .catch(err => console.error(`Error enviando email a ${to}:`, err.response?.body || err));
  },

  /**
   * Email de bienvenida al registrarse
   */
  sendWelcomeEmail(user) {
    const html = `
      <div style="font-family: 'Trebuchet MS', sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:10px; overflow:hidden;">
        <div style="background-color:#5BE2C5; color:black; padding:20px; text-align:center; font-weight:bold;">
          <h2>¡Creación de Cuenta Exitosa!</h2>
        </div>
        <div style="padding:20px;">
          <p>Hola ${user.nombres || 'Usuario'},</p>
          <p>Tu cuenta ha sido creada exitosamente. Ahora podés comenzar tu solicitud de crédito 100% online.</p>
          <a href="http://ec2-3-145-192-140.us-east-2.compute.amazonaws.com/"
            style="display:inline-block; background-color:#F39C12; color:white; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:bold;text-align:center;">
            Comenzar mi solicitud
          </a>
          <div style="background-color: #f8f8f8; padding: 10px; text-align: center; font-size: 13px; color: #777;"> 
            <p>Gracias por confiar en <strong>Kredia</strong>.Estamos aquí para apoyar el crecimiento de tu PyME.</p>
            <p>Este es un mensaje automático, no respondas a este correo.</p> 
          </div>
        </div>
      </div>
    `;
    this.sendEmail({ to: user.email, subject: 'Bienvenido a Kredia', html });
  },

  /**
   * Email de aprobación de crédito
   */
  sendCreditApprovedEmail(user) {
    const html = `
      <div style="font-family: 'Trebuchet MS', sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:10px; overflow:hidden;">
        <div style="background-color:#0D6546; color:white; padding:20px; text-align:center; font-weight:bold;">
          <h2>¡Felicidades, ${user.nombres || 'Usuario'}!</h2>
        </div>
        <div style="padding:20px;">
          <p style="font-size: 16px;"> Tenemos buenas noticias! Tu solicitud de crédito fue <strong>aprobada con éxito</strong>.</p> 
          <p style="font-size: 16px;"> <br> Ya podés revisar los detalles en tu perfil.
          <br> Pronto el asesor realizará el desembolso de tu crédito. Recibirás una notificación cuando el monto esté en tu cuenta.</p>
          <a href="http://ec2-3-145-192-140.us-east-2.compute.amazonaws.com/"
            style="display:inline-block; background-color:#F39C12; color:black; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:bold;text-align:center;">
            Ir a mi cuenta
          </a>
          <div style="background-color: #f8f8f8; padding: 10px; text-align: center; font-size: 13px; color: #777;"> 
            <p>Gracias por confiar en <strong>Kredia</strong>.Estamos aquí para apoyar el crecimiento de tu PyME.</p>
            <p>Este es un mensaje automático, no respondas a este correo.</p> 
          </div>
        </div>
      </div>
    `;
    this.sendEmail({ to: user.email, subject: '¡Felicidades! Tu crédito ha sido aprobado', html });
  },

  /**
   * Email de rechazo de crédito
   */
  sendCreditRejectedEmail(user) {
    const html = `
      <div style="font-family: 'Trebuchet MS', sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:10px; overflow:hidden;">
        <div style="background-color:#952014; color:white; padding:20px; text-align:center; font-weight:bold;">
          <h2>Rechazo del Crédito</h2>
        </div>
        <div style="padding:20px;">
          <p>Gracias por tu solicitud, ${user.nombres || 'Usuario'}.</p>
          <p style="font-size: 16px;"> En esta ocasión, no pudimos aprobar tu crédito, pero no te desanimes.</p>
          <p style="font-size: 16px;"> Sabemos que cada negocio es distinto y queremos ayudarte a estar más cerca de una próxima aprobación.</p>
          <p style="font-size: 16px;"> Muy pronto podrás acceder a nuevas oportunidades adaptadas a tu perfil.</p> 
          <p style="font-size: 16px;">¿Tienes dudas o necesitas asesoría? Estamos para ayudarte</p>
          <a href="http://ec2-3-145-192-140.us-east-2.compute.amazonaws.com/"
             style="display:inline-block; background-color:#F39C12; color:black; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:bold; text-align:center;">
             Chatea con nosotros
          </a>
          <div style="background-color: #f8f8f8; padding: 10px; text-align: center; font-size: 13px; color: #777;"> 
            <p>Gracias por confiar en <strong>Kredia</strong>.Estamos aquí para apoyar el crecimiento de tu PyME.</p>
            <p>Este es un mensaje automático, no respondas a este correo.</p> 
          </div>
        </div>
      </div>
    `;
    this.sendEmail({ to: user.email, subject: 'Tu crédito ha sido rechazado', html });
  }
};

export default NotificationService;
