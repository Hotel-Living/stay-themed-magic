// Email templates for Hotel Living platform
// All templates support: Spanish (es), English (en), Portuguese (pt), Romanian (ro)

export interface EmailContent {
  subject: string;
  greeting: string;
  content: string;
  actionButton?: {
    text: string;
    url: string;
  };
  signature: string;
}

export type SupportedLanguage = 'es' | 'en' | 'pt' | 'ro';

// 1. Email confirmation after registration
export function getEmailConfirmationTemplate(language: SupportedLanguage, confirmationUrl: string): EmailContent {
  const templates = {
    es: {
      subject: "Confirma tu dirección de correo electrónico",
      greeting: "Hola,",
      content: `
        <p>Gracias por registrarte en Hotel Living.</p>
        <p>Por favor, confirma tu correo electrónico haciendo clic en el siguiente botón:</p>
      `,
      actionButton: {
        text: "👉 Confirmar correo electrónico",
        url: confirmationUrl
      },
      signature: "El equipo de Hotel-living.com"
    },
    en: {
      subject: "Confirm your email address",
      greeting: "Hello,",
      content: `
        <p>Thank you for signing up at Hotel Living.</p>
        <p>Please confirm your email address by clicking the button below:</p>
      `,
      actionButton: {
        text: "👉 Confirm your email",
        url: confirmationUrl
      },
      signature: "El equipo de Hotel-living.com"
    },
    pt: {
      subject: "Confirme seu endereço de e-mail",
      greeting: "Olá,",
      content: `
        <p>Obrigado por se registrar no Hotel Living.</p>
        <p>Por favor, confirme seu e-mail clicando no botão abaixo:</p>
      `,
      actionButton: {
        text: "👉 Confirmar e-mail",
        url: confirmationUrl
      },
      signature: "El equipo de Hotel-living.com"
    },
    ro: {
      subject: "Confirmă adresa ta de e-mail",
      greeting: "Salut,",
      content: `
        <p>Îți mulțumim că te-ai înregistrat pe Hotel Living.</p>
        <p>Te rugăm să confirmi adresa ta de e-mail făcând clic pe butonul de mai jos:</p>
      `,
      actionButton: {
        text: "👉 Confirmă e-mailul",
        url: confirmationUrl
      },
      signature: "El equipo de Hotel-living.com"
    }
  };

  return templates[language] || templates.en;
}

// 2. Password recovery
export function getPasswordRecoveryTemplate(language: SupportedLanguage, resetUrl: string): EmailContent {
  const templates = {
    es: {
      subject: "Recuperación de contraseña",
      greeting: "Hola,",
      content: `
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para continuar:</p>
      `,
      actionButton: {
        text: "👉 Restablecer contraseña",
        url: resetUrl
      },
      signature: "El equipo de Hotel-living.com"
    },
    en: {
      subject: "Password recovery",
      greeting: "Hello,",
      content: `
        <p>We received a request to reset your password.</p>
        <p>Click the link below to continue:</p>
      `,
      actionButton: {
        text: "👉 Reset password",
        url: resetUrl
      },
      signature: "El equipo de Hotel-living.com"
    },
    pt: {
      subject: "Recuperação de senha",
      greeting: "Olá,",
      content: `
        <p>Recebemos um pedido para redefinir sua senha.</p>
        <p>Clique no link abaixo para continuar:</p>
      `,
      actionButton: {
        text: "👉 Redefinir senha",
        url: resetUrl
      },
      signature: "El equipo de Hotel-living.com"
    },
    ro: {
      subject: "Recuperarea parolei",
      greeting: "Salut,",
      content: `
        <p>Am primit o solicitare de resetare a parolei.</p>
        <p>Apasă pe linkul de mai jos pentru a continua:</p>
      `,
      actionButton: {
        text: "👉 Resetează parola",
        url: resetUrl
      },
      signature: "El equipo de Hotel-living.com"
    }
  };

  return templates[language] || templates.en;
}

// 3. Successful registration notification
export function getRegistrationSuccessTemplate(language: SupportedLanguage): EmailContent {
  const templates = {
    es: {
      subject: "Registro exitoso",
      greeting: "¡Bienvenido a Hotel Living!",
      content: `
        <p>Tu registro se ha completado correctamente.</p>
        <p>Ya puedes acceder a tu panel personalizado y comenzar a explorar.</p>
      `,
      signature: "El equipo de Hotel-living.com"
    },
    en: {
      subject: "Successful registration",
      greeting: "Welcome to Hotel Living!",
      content: `
        <p>Your registration was successful.</p>
        <p>You can now access your dashboard and start exploring.</p>
      `,
      signature: "El equipo de Hotel-living.com"
    },
    pt: {
      subject: "Registro bem-sucedido",
      greeting: "Bem-vindo ao Hotel Living!",
      content: `
        <p>Seu registro foi concluído com sucesso.</p>
        <p>Agora você pode acessar seu painel e começar a explorar.</p>
      `,
      signature: "El equipo de Hotel-living.com"
    },
    ro: {
      subject: "Înregistrare cu succes",
      greeting: "Bun venit la Hotel Living!",
      content: `
        <p>Înregistrarea ta a fost finalizată cu succes.</p>
        <p>Acum poți accesa panoul tău și începe explorarea.</p>
      `,
      signature: "El equipo de Hotel-living.com"
    }
  };

  return templates[language] || templates.en;
}

// Generate complete HTML email template
export function generateEmailHtml(emailContent: EmailContent): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${emailContent.subject}</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Hotel Living</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #667eea; margin-top: 0;">${emailContent.greeting}</h2>
          
          <div style="font-size: 16px; margin-bottom: 20px;">
            ${emailContent.content}
          </div>
          
          ${emailContent.actionButton ? `
            <div style="text-align: center; margin: 30px 0;">
              <a href="${emailContent.actionButton.url}" 
                 style="background-color: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                ${emailContent.actionButton.text}
              </a>
            </div>
          ` : ''}
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              Un saludo cordial,<br>
              <strong>${emailContent.signature}</strong>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Helper function to detect user language or fallback to default
export function getUserLanguage(requestedLanguage?: string): SupportedLanguage {
  if (!requestedLanguage) return 'en'; // Default to English if no language specified
  
  const cleanLang = requestedLanguage.toLowerCase().split('-')[0] as SupportedLanguage;
  const supportedLanguages: SupportedLanguage[] = ['es', 'en', 'pt', 'ro'];
  
  return supportedLanguages.includes(cleanLang) ? cleanLang : 'en';
}