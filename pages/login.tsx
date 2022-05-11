import { NextPage } from 'next';
import FormTabs from '../Components/Auth/FormTabs';
import Header from '../Components/Auth/Header';

const PageComponent: NextPage = () => {
  return (
    <div id="auth">
      <Header />
      <main>
        <FormTabs />

        <form id="form-login">
          <input type="email" name="email" placeholder="E-mail" required />
          <input type="password" name="password" placeholder="Senha" required />

          <footer>
            <a href="forget.html">Esqueceu a senha?</a>
            <button type="submit">Enviar</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default PageComponent;
