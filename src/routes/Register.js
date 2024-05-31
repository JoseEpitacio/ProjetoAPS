import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

function Register() {
    const handleClickRegister = (values) => console.log(values);

    const validation = yup.object().shape({
        username: yup.string().required("Campo obrigatório"),
        first_name: yup.string().required("Campo obrigatório"),
        last_name: yup.string().required("Campo obrigatório"),
        email: yup.string().required("Campo obrigatório").email("Email inválido"),
        password: yup.string().required("Campo obrigatório")
            .min(8, "Mínimo de 8 caracteres")
            .max(65, "Máximo de 65 caracteres"),
    });

    return (
        <div className="container_2">
            <h1>Cadastro</h1>
            <p>Digite os dados desejados nos campos abaixo.</p>
            <Formik initialValues={{}}
            onSubmit={handleClickRegister} validationSchema={validation}>
                <Form> 
                    <div className="login-form-group">
                        <label for="username" className="textUser">Usuário:</label>
                        <Field name="username" className="form-field" placeHolder="Nome de Usuário:" />
                        <ErrorMessage name="username" component="span" className="form-error"/>
                    </div>
                    <div className="login-form-group">
                        <label for="first_name" className="textUser">Nome:</label>
                        <Field name="first_name" className="form-field" placeHolder="Nome:" />
                        <ErrorMessage name="first_name" component="span" className="form-error"/>
                    </div>
                    <div className="login-form-group">
                        <label for="last_name" className="textUser">Sobrenome:</label>
                        <Field name="last_name" className="form-field" placeHolder="Sobrenome:" />
                        <ErrorMessage name="last_name" component="span" className="form-error"/>
                    </div>
                    <div className="login-form-group">
                        <label for="email" className="textUser">Email:</label>
                        <Field name="email" className="form-field" placeHolder="E-mail:" />
                        <ErrorMessage name="email" component="span" className="form-error"/>
                    </div>
                    <div className="login-form-group">
                        <label for="password" className="textUser">Senha:</label>
                            <Field name="password" className="form-field" placeHolder="Senha:" />
                            <ErrorMessage name="password" component="span" className="form-error"/>
                    </div>
                    <button className="button" type='submit'>Cadastrar-se</button>
                </Form>
            </Formik>
        </div>
    );
}
export default Register