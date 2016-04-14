 <div class="w3-container">
    <div class="w3-center"><br>
             <h1>Cadastro de Usuário</h1>
    </div>
      <form id="cadastro_usuario" action="cadastro_usuario.php" method="POST">         
      <div class="w3-section">
        <label class="w3-label"><strong>Nome</strong></label>
        <input class="w3-input w3-border w3-margin-bottom" id="nome" name="nome" type="text" placeholder="Insira seu nome completo" required>
        
        <label class="w3-label"><strong>Login</strong></label>
        <input class="w3-input w3-border" id="email" name="email" type="text" placeholder="Insira seu email" required>
        
         <label class="w3-label"><strong>Senha</strong></label>
        <input class="w3-input w3-border w3-margin-bottom" id="senha" name="senha" type="password" placeholder="Insira sua senha" required>
        
        <label class="w3-label" for="escolaridade"><strong>Escolaridade</strong>
            <select name="escolaridade" id="escolaridade" required>
                                <option value=""> --- selecione ---</option>
                                <option value="Primeiro Grau Incompleto">1&deg; Grau - Prim&aacute;rio Incompleto</option>
                                <option value="Primeiro Grau Completo">1&deg; Grau - Prim&aacute;rio Completo</option>
                                <option value="Ginasial Incompleto">1&deg; Grau - Ginasial Incompleto</option>
                                <option value="Ginasial Completo">1&deg; Grau - Ginasial Completo</option>
                                <option value="Segundo Grau Incompleto">2&deg; Grau - Colegial Incompleto</option>
                                <option value="Segundo Grau Completo">2&deg; Grau - Colegial Completo</option>
                                <option value="Terceiro Grau Incompleto">3&deg; Grau - Superior Incompleto</option>
                                <option value="Terceiro Grau Completo">3&deg; Grau - Superior Completo</option>
                                <option value="Especializa&ccedil;&atilde;o">Especializa&ccedil;&atilde;o</option>
                                <option value="Mestrado">Mestrado</option>
                                <option value="Doutorado">Doutorado</option>
                </select>  <br />
        </label>    
         
        <label class="w3-label" for="estado"><strong>Estado</strong>
                            <select  name="estado" id="estado"required>
                                <option value="">---Selecione---</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espirito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                            </select>
        </label> <br> 
         <label class="w3-label"><strong>Cidade</strong></label>
        <input class="w3-input w3-border w3-margin-bottom"  id="cidade" name="cidade" type="text" placeholder="Insira o nome de sua cidade" required>
        </div>
          <label class="w3-label"><strong>Conte-nos qual é o seu conhecimento sobre audiodescrição:</strong></label> 
          <textarea class="w3-input w3-border" name="descricao" id="descricao"required></textarea></br>
                <label class="w3-label"required><strong>Marque seu tipo de usuário</strong> (Para ser aceito seu usuário será avaliado pelo administrador)<br>

                    <br><input id='categoria' name='categoria[]' type='checkbox' value='1'>
                    <label for='categoria1'><strong>Usuário</strong>(O usuário tem permissão upload de imagens que deseja audiodescrição)</label>
                    <br><input id='categoria' name='categoria[]' type='checkbox' value='2'>
                    <label for='categoria2'><strong>Audiodescritor</strong>(O usuário tem permissão de fazer audio descricao nas imagens)</label>
                    <br><input id='categoria' name='categoria[]' type='checkbox' value='3'>
                    <label for='categoria3'><strong>Revisor</strong>(O usuário tem permissão de fazer revisões das imagens com audiodescrição)</label>

      </div>
      
    <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
      <button class="w3-btn w3-btn-block w3-green">Enviar</button>
      
    </div>
</form>
  </div>
      </div>