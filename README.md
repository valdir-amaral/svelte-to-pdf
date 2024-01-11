# Manual de utilização - Ferramenta HTML para PDF

---

## Sobre o projeto

HTML para PDF é uma ferramenta que pagina automaticamente o conteúdo nela inserido (tabelas, imagens e entre outros elementos) e transforma em um PDF dinâmico.


## Comece agora

Para iniciar, crie um documento HTML básico na raiz do projeto e importe dentro da tag ```<head>``` os arquivos CSS e JavaScript pré-compilados, para a aplicação já rodar perfeita!

<img src="/doc/doc-1.png"/>


## Inserindo elementos fixos

Para utilizar header e footer, basta criar uma tag no body com a classe "page", indicando que é um modelo de página que irá se repetir pra todas as outras.

<img src="/doc/doc-2.png" />

```O id 0 deve ser aplicado para que o elemento suma. Não queremos que a página modelo seja impressa junto, não é?```

Você ainda pode colocar a marca d'água da sua empresa no fundo de um jeito bem simples. basta incorporar uma imagem normalmente no HTML utilizando a classe "watermark"

```
<img src="/caminho/para/imagem.jpg" class="watermark" />
```

## Adicionando conteúdo

O conteúdo para a exibição das páginas é inserido dentro da div com id "main-content", que faz a mágica acontecer. Utilize imagens, tabelas e outros elementos HTML!

```
<div id="main-content" style="display: none">
  <h1>Meu título adorável!</h1>
</div>
```

<img src="/doc/doc-3.png" />

## Sumário

O sumário é um sistema de navegação que permite encontrar capítulos já separados automaticamente. Funciona pela hierarquia dos seus títulos (h1,h2,h3,h4). Após criado, seu elemento é identificado pelo sumário como

```
(elemento)-(conteúdo)
```

Ou seja: ```<h2>Meu subtitulo adoravel</h2>``` se converte a ```<h2 id="h2-meu-subtitulo-adoravel">Meu subtitulo adoravel</h2>```

Da mesma forma como isso é feito automaticamente, você pode ao criar o HTML referenciar os seus elementos com links internos navegáveis.

Você pode ver a hierarquia pronta apertando no ícone do canto superior esquerdo:

<img src="/doc/doc-4.png" />

Clicando no texto você é redirecionado para o elemento e na seta os filhos são mostrados (subtítulos h2 dentro de h1 e por aí vai)

## Elementos pré-definidos

Quebra de página ➡️ ```<div class="page-break"></div>``` <br>
Essa tag irá ignorar se o conteúdo pode continuar e uma nova página será criada.

Página em branco ➡️ ```<div class="blank-page"></div>``` <br>
Uma página sem conteúdo algum, a não ser seu footer, header e marca d'água, será criada. 

## Tags de estilo

Se por acaso você não gostar muito de CSS para estilizar coisas simples dos seus elementos, você pode usar algumas tags obsoletas como o <a href="https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/center" target="_blank">center</a>, por exemplo, ou usar atributos, como o <a href="https://www.w3resource.com/html/attributes/html-align-attribute.php">align="center"</a>.

## Impressão

Depois de montado o seu PDF, você pode apertar no botão IMPRIMIR, no canto superior direito, para realizar a impressão do seu documento e/ou salvá-lo como PDF em um arquivo.

<img src="/doc/doc-5.png" /> 

E pronto! Deixe sua criatividade fluir criando o seu próprio estilo - é só importar normalmente no index.html.
