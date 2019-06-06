countryBR = Country.find_or_create_by(name: 'Brasil')
countryUS = Country.find_or_create_by(name: 'Estados Unidos')
countryPY = Country.find_or_create_by(name: 'Paraguai')

stateSP = State.find_or_create_by(name: 'São Paulo', country: countryBR)
statePR = State.find_or_create_by(name: 'Paraná', country: countryBR)
stateNY = State.find_or_create_by(name: 'Nova York', country: countryUS)

citySP = City.find_or_create_by(name: 'São Paulo', state: stateSP)
cityCA = City.find_or_create_by(name: 'Campinas', state: stateSP)
cityCTBA = City.find_or_create_by(name: 'Curitiba', state: statePR)
cityIGU = City.find_or_create_by(name: 'Foz do Iguaçu', state: statePR)
cityCAC = City.find_or_create_by(name: 'Cascavel', state: statePR)
cityNY = City.find_or_create_by(name: 'Nova York', state: stateNY)

google = Company.find_or_create_by(name: "Google");
facebook = Company.find_or_create_by(name: "Facebook");

Complaint.create(
  title: "Colocaram minha foto em alguns grupos nas redes sócias, usando o facebook",
  description: "Sou motorista de aplicativo, e ocorreu um problema com um passageiro no dia 24/05/2019, onde o mesmo relatou que havia esquecido um celular no meu veiculo. Estava resolvendo esse problema com esse passageiro. Porém, o mesmo usou o facebook para divulgar minha imagem inclusive em grupos de bazar. Grupo que é criado para fazer vendas. Ele usou dessa plataforma para caluniar dizendo que eu sou [Editado pelo Reclame Aqui]. Gostaria de um posicionamento do facebook. Pois, como é usada essa plataforma de comunicação digital. De maneira que não passa por nenhuma avaliação. Antes de ser publicado, algo por alguém. Estou constrangido. E esses grupos de bazar como os administradores deixam. Se no proprio grupo tem regras de postar somente vendas. Estou deixando 3 arquivos em anexo para poderem ver o que aconteceu e retirar todas essas publicações. Tenho print de tudo.",
  company: facebook,
  city: citySP
)

Complaint.create(
  title: "Meu fecebook foi Hackeado",
  description: "Tenho uma conta desde 2011 então [Editado pelo Reclame Aqui]am minha conta não estou conseguindo mas acesso da minha conta meu e-mail da conta daniele.gennio@hotmail.com Minha senha eram ceamodasfon então meu filho entrou link no fecebook esse link [Editado pelo Reclame Aqui] meu fecebook quero minha conta de volta por gentileza mim ajude recupera minha conta.",
  company: facebook,
  city: citySP
)

Complaint.create(
  title: "O código de verificação do Facebook não esta sendo enviado",
  description: "Meu facebook por algum motivo pediu pra eu inserir um código de 6 dígitos para poder usar a minha conta, porem por mais que eu tente usar o código ele não funciona e quando eu tento usar a opção enviar código de confirmação novamente simplesmente aparece uma mensagem Parece que você está usando este recurso de forma não prevista. Por favor, aja com cautela ou o recurso poderá ser bloqueado. e nenhum código é enviado.",
  company: facebook,
  city: citySP
)

Complaint.create(
  title: "Trocaram a senha do meu facebook, e agora estou impossibilitado de usá-lo",
  description: "Estava jogando free fire, quando me deparei com uma mensagem ''sua conta foi logada em outro dispositivo'' logo estranhei, então minimizei o jogo e tentei entrar no meu facebook, lá aprecia que ''EU'' havia trocado minha senha a 58 minutos atrás, sendo que isso não aconteceu, a pessoa responsável por isso usava um ip que eu jugo ser falso, usava um ip de Paris, essa conta é muito importante para mim, gostaria de tê-la novamente.
  A primeira imagem deixei em destaque o e-mail que foi responsável pela troca da senha, as outas duas são minhas tentativas falhas de tentar recuperar meu facebook.
  A segunda imagem trata-se de um artifício usado pelo hacker.
  O facebook não está colaborando, ja mandei vários documentos que comprovam que o facebook é meu, mas até agora nada, como e possível o próprio dono não conseguir recuperar algo que é seu.
  Desde já agradeço a ajuda de vocês.",
  company: facebook,
  city: cityCA
)

Complaint.create(
  title: "Sms não chega",
  description: "Estou fazer a mesma reclamação duas vezes, eu tento fazer login na minha conta de e-mail nathjesusnascimento@hotmail.com e o SMS de confirmação não chega, o número está cadastrado mas não chega nunca, quando tento mudar a senha o SMS chega, mas para entrar na conta o SMS não chega.
  Eu PRECISO de uma forma que o código chegue por e-mail, já que por SMS ele não está chegando, já tentei de vários dispositivos mas mesmo assim não chega
  Eu tenho página do meu negócio nessa conta, e NECESSITO acessar.",
  company: facebook,
  city: cityCTBA
)

Complaint.create(
  title: "Onde falo com o suporte",
  description: "Olá desculpa abrir reclamação é que nao sei como entrar em contato com o suporte do facebook
  Eu recebi credito de 90 reais para meu anuncio só que eu nao sei como usar eu ja adicionei na pagina coloquei o cartao tudo certinho só que deletei a postagem sem querer então criei outra postagem e fiz o anuncio de novo mas nao sei se vai cobrar de mim ou do credito que me deu.. obrigada
  na imagem esta minha pagina e o anuncio",
  company: facebook,
  city: cityCTBA
)

Complaint.create(
  title: "Gmail: Recuperação da Conta!",
  description: "Prezados,
  Eu não tenho muita história para contar devido a minha enorme chateação! Sinceramente, estou decepcionada! A internet está lotada de reclamações semelhantes: o Google não reconhece que a pessoa é a proprietária da conta do Gmail!",
  company: google,
  city: cityIGU
)

Complaint.create(
  title: "PAGAMENTO INDEVIDO",
  description: "Em 03/Jun/19 o valor de R$ 1.359,27 foram transferidos indevidamente da minha conta pelo boleto bancário n 341919806886 754600004020 311950071792 40000135927 tendo como beneficiário a empresa GOOGLE BRASIL. Solicito a que o total do valor seja estornado para a minha conta corrente o quanto antes já que não tenho com a empresa nenhum serviço contratado.",
  company: google,
  city: cityIGU
)

Complaint.create(
  title: "Reembolso - Google ONE 100GB",
  description: "Em 21 de maio de 2019, tive o valor de R$: 69,90 descontado da minha fatura do cartão de crédito, referente a renovação automática da anuidade de 100 GB (Google One). Por não usar mais o serviço, solicitei o cancelamento do mesmo e o referido reembolso. ",
  company: google,
  city: cityIGU
)

Complaint.create(
  title: "Restabelecer e-mail",
  description: "Solicito com urgência o resgate de uso do meu e-mail acvssss@gmail.com tendo em vista não me recordar da senha de acesso.",
  company: google,
  city: cityCAC
)

Complaint.create(
  title: "não me deixam entrar no meu gmail",
  description: "tenho meu email pro meu enem e está no gmail. mas eles pedem um numero de celular que nem tenho mais e não da nenhuma outra opção pra mudar. preciso entrar pra vericiar meu enem e não deixam abrir meu email por conta de um numero de telefone isso é um absurdo",
  company: google,
  city: cityCAC
)

Complaint.create(
  title: "Avaliações indevidas sobre minha empresa",
  description: "No início de Abril-2019, recebemos uma avaliação sobre nossa empresa. Ao verificarmos a origem, trata-se de uma pessoa que nunca esteve em nossa empresa, e nunca utilizou dos nossos serviços... Tento através dos links de report disponíveis desde esta data, remover a avaliação indevida, porém ninguém retorna, nem mesmo retira a avaliação desta pessoa. Ao buscar informações sobre esta pessoa, percebi que o mesmo avalia várias empresas de três a uma estrela, acredito eu, somente para ganhar pontos no Google e aumentar seu nível como avaliador... Lamentável para nós empresários que trabalhamos diariamente para mantermos excelência no atendimento, receber uma avaliação indevida e o Google não tomar nenhuma providência. Espero que através deste portal, alguém tome alguma providência, pois verifiquei também que este problema de avaliação indevida ocorre a muito tempo e nada foi feito, tirando toda credibilidade das avaliações Google..",
  company: google,
  city: cityNY
)