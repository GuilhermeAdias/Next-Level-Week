import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './ModalCreatedPoint.css';

const Modal = () => {
    return (
        <div id="page-modal">
            <div className="content">
                <main>
                    <div>
                        <FiCheckCircle name="chek" size={80} color="#2FB86E" />
                    </div>
                    <h1>Cadastro Concluido!.</h1>

                    <div>
                        <Link to="/">
                            <span>
                                <FiArrowLeftCircle />
                            </span>
                            <strong>
                                Voltar para página inicial
                        </strong>
                        </Link>
                    </div>

                </main>
            </div>
        </div>
    )
}

export default Modal;
