# Manual do Usuário - Convertedor HTML para PDF

---

## Introdução

Bem-vindo ao Manual do Usuário da ferramenta de conversão HTML para PDF. Esta ferramenta foi desenvolvida para simplificar o processo de criação de documentos PDF dinâmicos, oferecendo a capacidade de paginar automaticamente conteúdos variados, como tabelas, imagens e outros elementos.



## Iniciando o Processo

Para começar, crie um documento HTML básico na raiz do seu projeto. Importe os arquivos CSS e JavaScript pré-compilados dentro da tag `<head>` para garantir o perfeito funcionamento da aplicação.

![Estrutura do Projeto](/doc/doc-1.png)


## Adicionando Elementos Fixos

Para incorporar cabeçalho (header) e rodapé (footer), simplesmente crie uma tag no corpo (body) do documento com a classe "page". Isso indicará que é um modelo de página que será replicado para todas as outras.

![Exemplo de Elementos Fixos](/doc/doc-2.png)

Se deseja adicionar facilmente a marca d'água da sua empresa, basta incorporar uma div com uma imagem no HTML usando o id "watermark".

```html
<div id="watermark">
  <img src="/caminho/para/imagem.jpg" />
</div>
```

## Incorporando Conteúdo

O conteúdo destinado à exibição das páginas é inserido na div com o ID "main-content", a qual desencadeia as operações mágicas. Sinta-se à vontade para utilizar imagens, tabelas e outros elementos HTML!

```html
<div id="main-content">
  <h1>Meu título adorável!</h1>
  <!-- Adicione aqui o restante do seu conteúdo -->
</div>
```

<img src="/doc/doc-3.png" />

## Sumário Automático

O sumário é um sistema de navegação que facilita a localização de capítulos, organizando-os automaticamente com base na hierarquia dos títulos (h1, h2, h3, h4). Após a criação, cada elemento é identificado no sumário com um id aleatório:

Assim como isso é feito automaticamente, você também pode criar links internos navegáveis ao referenciar seus elementos no HTML. A hierarquia pode ser visualizada ao clicar no ícone no canto superior esquerdo:

![Exemplo de Hierarquia](/doc/doc-4.png)

Ao clicar no texto, você será redirecionado para o elemento correspondente, enquanto ao clicar na seta, os filhos serão exibidos (subtítulos h2 dentro de h1 e assim por diante).


## Elementos Pré-definidos

Quebra de Página ➡️ ```<div class="page-break"></div>``` <br>
Utilize esta tag para forçar uma quebra de página. O conteúdo subsequente será transferido para uma nova página, ignorando se há espaço suficiente na página atual.

Página em Branco ➡️ ```<div class="blank-page"></div>``` <br>
Esta tag cria uma página vazia, preservando apenas o cabeçalho, rodapé e marca d'água. É útil para situações em que você deseja inserir uma página em branco no documento.


## Tags de Estilo

Caso você prefira evitar o uso de CSS para estilizar elementos simples, é possível recorrer a tags obsoletas, como o <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/center" target="_blank">center</a>. Outra opção é utilizar atributos, como o <a target="_blank" href="https://www.w3resource.com/html/attributes/html-align-attribute.php">align="center"</a>.

## Impressão

Após criar o seu PDF, clique no botão "IMPRIMIR" no canto superior direito para imprimir o documento ou salvá-lo como um arquivo PDF.

![Botão de Impressão](/doc/doc-5.png) 

E está feito! Deixe sua criatividade fluir ao personalizar o estilo - basta importar normalmente no arquivo index.html.

