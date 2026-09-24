# SOLID

## S (SRI - Single Responsibility Principle)

- Uma classe deve ter uma única responsabilidade
- Impede a criação de uma classe com diversas responsabilidades que dá trabalho quando surge a necessidade de uma manutenção
- Ex: deixa a classe UsersRepository tomar conta somente da persistência de dados, enquanto a classe RegisterUseCase toma conta das regras de negócio necessárias para a criação de um usuário
- Caso uma classe cresça demais, você pode ter outros métodos para lidar com ela. O padrão é lidar com elas agrupando-as por entidade, mas no caso de um repositório também é possível separar as operações por Leitura e Escrita (CQRS), interfaces segregadas (o I do SOLID) ou classes por operação única (padrão handler/use case) caso haja uma lógica muito diferente e extensa em cada operação

## O (OCP - Open-Closed Principle)

- Você deve ser capaz de estender um comportamento de uma classe sem a necessidade de modificá-lo
- Facilita na extensibilidade de código sem a necessidade de alterar uma classe existente, e sim estendê-la
- Ex: tenho a classe abstrata ou a interface UsersRepository que deve ser extensível (como é, pelo fato de estar sendo implementada pela classe PrismaUsersRepository), mas não modificável (no sentido de alterar coisas já estabelecidas e funcionais)
- Caso seja necessário alterar uma classe, o SOLID sugere que você use composição (Design Pattern Decorator) em vez de herança, fazendo com que ao invés de alterar a classe antiga você crie uma nova classe que implementa a interface base e receba a classe antiga como uma dependência

## L (LSP - Liskov Substitution Principle)

- As classes derivadas devem ser substituíveis por suas classes bases
- Impede que uma classe que estende uma interface não possua um de seus recursos corretamente, sendo necessário que ela implemente tudo ao ponto de substituir a classe base em qualquer caso que ela seja usada
- Ex: as classes derivadas de UsersRepository (PrismaUsersRepository e InMemmoryUsersRepository) devem implementar tudo presente na interface
- Além de interfaces, caso uma classe herde caracteristicas de outra classe não abstrata, ela precisará implementar a classe corretamente ao ponto que ela possa substituir a classe pai. O que mais conta para saber se ela pode ou não substituir a classe pai são os possíveis retornos e comportamentos dos métodos, e tipos e comportamentos de atributos

## I (ISP - Interface Segregation Principle)

- Crie interfaces granulares e específicas para seus clientes
- Conceito que diz que todas especificações da interface devem ser implementadas na classe, caso contrário, essa interface deve ser separada para que a classe que a implemente possua todas suas especificações
- Ex: se tivesse uma interface UsersRepository e uma classe ReadPrismaUsersRepository que só queira implementar os métodos de read, ela não pode implementar UsersRepository, e essa interface precisará ser dividida entre ReadUsersRepository e UsersRepository, que agora implementa não possui mas os métodos de read nela mas implementa a nova estende

## D (DIP - Dependency Inversion Principle)

- Dependa de abstrações, não de implementações
- Ao invés de depender de classes concretas que executam algo, dependa de classes abstratas ou interfaces em suas classes. Elas mostram o que deve ser feito, mas não como deve ser feito
- Ex: ao invés de instanciar um repositório que insere dados no prisma dentro do caso de uso, receba um atributo do construtor que seja uma abstração dessa dependência, como uma interface que diz quais métodos esse repositório do prisma deve possuir
