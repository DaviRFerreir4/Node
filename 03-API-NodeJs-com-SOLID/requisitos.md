# GymPass style app

## RF (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [] Deve ser possível o usuário obter seu histórico de logins
- [x] Deve ser possível o usuário buscar academias próximas (10 kms)
- [x] Deve ser possível buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in numa academia
- [] Deve ser possível validar o check-in do usuário
- [x] Deve ser possível cadastrar uma academia

## RN (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um email duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [] o check-in só pode ser validado até 20 minutos após criado
- [] o check-in só pode ser validado por administradores
- [] a academia só pode ser cadastrada por administradores

## RNF (Requisitos Não Funcionais)

- [x] a senha do usuário precisa estar criptografada
- [x] os dados da aplicação devem estar persistidos num banco postgres
- [x] todas listas de dados precisa estar paginadas com 20 itens por página
- [] o usuário deve ser identificado com um JWT
