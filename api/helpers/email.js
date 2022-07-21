import nodemailer from 'nodemailer';

export const registerEmail = async (data) => {
    const { email, name, token } = data;    

    // TODO: Mover a variables de entorno
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "962e95246aba30",
            pass: "f8d3cdb4eb40cf"
        }
    });

    // Información del email

    const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Confirmación de cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `
            <p>¡Hola ${name}👋🏻! Comprueba tu cuenta en UpTask</p>
            <p>
                Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace: 
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
            </p>
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    });
};
export const resetPasswordEmail = async (data) => {
    const { email, name, token } = data;    

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "962e95246aba30",
            pass: "f8d3cdb4eb40cf"
        }
    });

    // Información del email

    const info = await transport.sendMail({
        from: '"UpTask - Administrador de proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Reestablece tu contraseña",
        text: "Reestablece tu contraseña",
        html: `
            <p>¡Hola ${name}👋🏻! Has solicitado reetablecer tu password</p>
            <p>
                Sigue el siguiente enlace para generar una nueva contraseña:
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer contraseña</a>
            </p>
            <p>Si tú no solicitaste este email, puedes ignorar el mensaje</p>
        `
    });
};
