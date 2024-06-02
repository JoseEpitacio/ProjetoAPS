import axios from "axios";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function NewBook() {
    const navigate = useNavigate();

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/author/')
        .then(response => {
            setAuthors(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }, []);

    const handleClickNewBook = (values) => {
        axios.post('http://127.0.0.1:8000/book/', {
            book_name: values.book_name,
            book_genre: values.book_genre,
            authors_ids: values.authors_ids,
            available: true,
            num_pages: values.num_pages,
            book_img: values.book_img
        })
        .then(response => {
            console.log('Livro cadastrado com sucesso!', response);
            navigate('/');
        })
        .catch(error => {
            console.error('Erro: ', error);
        });
    }

    const validation = yup.object().shape({
        book_name: yup.string().required("Campo obrigatório"),
        book_genre: yup.string().required("Campo obrigatório"),
        authors_ids: yup.array().required("Campo obrigatório"),
        book_img: yup.string().required("Campo obrigatório"),
        num_pages: yup.number().required("Campo obrigatório"),
    });

    return (
        <div className="">
            <h1>Novo Livro</h1>
            <p>Digite os dados do novo livro nos campos abaixo.</p>
            <Formik 
            initialValues={{ 
                book_name: '',
                book_genre: '',
                authors_ids: [],
                book_img: '',
                num_pages: 0}}
            onSubmit={handleClickNewBook}
            validationSchema={validation}>
                {({ values }) => (
                    <Form>
                    <div className="login-form-group">
                        <label for="book_name" className="textUser">Nome do Livro:</label>
                        <Field name="book_name" className="form-field" placeHolder="Nome do Livro:" />
                        <ErrorMessage name="book_name" component="span" className="form-error"/>
                    </div>
                    <div className="login-form-group">
                        <label for="book_genre" className="textUser">Gênero:</label>
                        <Field name="book_genre" className="form-field" placeHolder="Gênero:" />
                        <ErrorMessage name="book_genre" component="span" className="form-error"/>
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="authors_ids" className="textUser">Autores:</label>
                        <FieldArray name="authors_ids">
                            {({ push, remove }) => (
                                <div>
                                {authors.map((author, index) => (
                                    <div key={author.id_author}>
                                    <label>
                                        <input
                                        type="checkbox"
                                        name={`authors_ids.${index}`}
                                        value={author.id_author}
                                        checked={values.authors_ids.includes(author.id_author)}
                                        onChange={e => {
                                            if (e.target.checked) push(author.id_author);
                                            else {
                                            const idx = values.authors_ids.indexOf(author.id_author);
                                            if (idx !== -1) remove(idx);
                                            }
                                        }}
                                        />
                                        {author.author_name}
                                    </label>
                                    </div>
                                ))}
                                </div>
                            )}
                            </FieldArray>
                        <ErrorMessage name="authors_ids" component="span" className="form-error"/>
                    </div>
                    <div className="login-form-group">
                        <label for="book_img" className="textUser">Imagem:</label>
                        <Field name="book_img" className="form-field" placeHolder="Imagem:" />
                        <ErrorMessage name="book_img" component="span" className="form-error"/>
                    </div>
                    <div className="">
                        <label htmlFor="num_pages" className="textUser">Número de Páginas:</label>
                        <Field name="num_pages" type="number" className="form-field" placeholder="Número de Páginas:" />
                        <ErrorMessage name="num_pages" component="span" className="form-error"/>
                    </div>
                    <button className="button" type='submit'>Cadastrar</button>
                </Form>
                )}
            </Formik>
        </div>
    )
}
export default NewBook;