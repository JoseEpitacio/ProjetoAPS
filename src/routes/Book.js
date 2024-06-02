import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EditBookModal from '../components/EditBookModal';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Book() {
    const { id_book } = useParams();
    const [book, setBook] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/book/${id_book}`)
          .then(response => {
            setBook(response.data);
          })
          .catch(error => {
            console.error('There was an error!', error);
          });

      }, [id_book]);

    if (!book || !book.comments){
        return <div>Carregando...</div>
    }

    const handleClickLoan = () => {
        const token = sessionStorage.getItem('token');
        const user_id = sessionStorage.getItem('user_id');

        if (user_id){
            axios.post('http://127.0.0.1:8000/loan/', {
                user: user_id,
                book: id_book
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Livro alugado com sucesso!', response);
            })
            .catch(error => {
                console.error('Erro: ', error);
            });
        } else {
            alert('Você precisa estar logado para alugar um livro!');
        }
        }

    const openEditModal = () => {
        setEditModalOpen(true);
    }

    const closeEditModal = () => {
        setEditModalOpen(false);
    }

    const handleClickDelete = () => {
        axios.delete(`http://127.0.0.1:8000/book/${book.id_book}/`)
        .then(response => {
            console.log('Livro excluído com sucesso!', response);
        })
        .catch(error => {
            console.error('Erro: ', error);
        });
        navigate('/');
    }

    return (
        <div className='main_container'>
            <div className='books_container'>
                <h1>{book.book_name}</h1>
                <img src={book.book_img} />
                <p>Autores:
                    {book.authors.map(author => (
                        <div key={author.id_author}>
                            {author.author_name}
                        </div>
                    ))}
                </p>
                <p>Gênero: {book.book_genre}</p>
                <p>Páginas: {book.num_pages}</p>
                <p>Disponibilidade: {book.available ? 'Disponível' : 'Indisponível'}</p>
            </div>
            <button onClick={handleClickLoan} className='button'>Alugar</button>
            <button onClick={openEditModal} className='button'>Editar</button>
            {editModalOpen && <EditBookModal book={book} onClose={closeEditModal} />}
            <div className='comments_container'>
                <h1>Comentários</h1>
                {book.comments.map((comment, index) => (
                    <div key={index}>
                        <p>{comment.content}</p>
                        <p>Por: {comment.username}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleClickDelete} className='button'>Excluir</button>
        </div>
    );
}
export default Book
