import React from "react";

import whastappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars2.githubusercontent.com/u/55250762?s=460&u=466bf40737221df81874a45c7294dca7eaf51b71&v=4"
          alt="Matheus Oliveira"
        />
        <div>
          <strong>Guilherme Abranches Dias</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.
        <br />
        <br />
        Apaixonado por explodir coisas em laboratório e por mudar a vida das
        pessoas através de experiências. Mais de 200.000 pessoas já passaram por
        uma das minhas explosões.
      </p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ 100,00</strong>
        </p>
        <button type="button">
          <img src={whastappIcon} alt="" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;