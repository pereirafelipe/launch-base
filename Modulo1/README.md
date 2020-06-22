<h1 align="center">Introdução à programação WEB</h1>

<p align="center">
   <img src="https://user-images.githubusercontent.com/48728541/85210023-1cf83300-b313-11ea-9676-3b87ac97a3d8.png" />
</p>

## Sumário:

- [Variáveis](#ancora1)
- [Operadores](#ancora2)
- [Condicionais](#ancora3)
- [Laços de Repetição](#ancora4)
- [Objetos](#ancora5)
- [Arrays](#ancora6)
- [Funções](#ancora7)

## Conceitos básicos da programação:

- O que é programação?
- Algoritmos
- Software
- Linguagens de programação

## JavaScript

<a id="ancora1"></a>
### Variáveis:

**Escopo: é um contexto que delimita o "espaço" em que um código está associado**

Const:
   - escopo de bloco
   - não pode ser redeclarada ou reatribuída
   
   ```
   const name = "Fernanda" //certo
   const name = "Pedro" //errado
   name = "João" //errado
   ```

Let:
   - escopo de bloco
   - pode ser reatribuída
   
   ```
   let name = "Fernanda" //certo
   name = "João" //certo
   ```

Var:
   - escopo de função
   - pode ser redeclarada e reatribuída
    
   ```
   var name = "Fernanda" //certo
   var name = "Pedro" //certo
   name = "João" //certo
   ```
   
<a id="ancora2"></a>
### Operadores:

#### Aritméticos:

| Operador  |   Descrição   |
|-----------|---------------|
|     +     |      Soma     |
|     -     |   Subtração   |
|     *     | Multiplicação |
|     /     |    Divisão    |
|     %     |     Resto     |

#### Lógicos:

| Operador  |   Descrição   |
|-----------|---------------|
|     !     |   Negação     |
|     &&    |   E           |
|  \|\|     |   OU          |

#### Relacionais:

| Operador | Descrição             |
|----------|-----------------------|
| >        | Maior que             |
| <        | Menor que             |
| >=       | Maior ou igual        |
| <=       | Menor ou igual        |
| ==       | Igual                 |
| !=       | Diferente             |
| ===      | Igual, até o tipo     |
| !==      | Diferente, até o tipo |

<a id="ancora3"></a>
### Condicionais:

- If e else:
```
if(true){
  //instruções
} else {
  //instruções
}
```

- Switch:
```
switch(exp){
  case "1":
    //instruções
    break;
   ...
  default:
    //instruções
    break;
}
```
<a id="ancora4"></a>
### Laços de repetição:

- for
```
for(let i = 0; i < 10; i++){
  //instruções
}
```

- while
```
let x = 0;
while(x < 10){
  //instruções
  x++
}
```

- do while
```
let x = 0;
do{
  //instruções
  x++
}while(x < 10);
```
<a id="ancora5"></a>
### Objetos:

```
const user = {
  name: "Fernanda",
  age: 19,
};

console.log(user.name); // Fernanda
```
<a id="ancora6"></a>
### Arrays:

```
const numbers = [1, 2, 3, 4];

console.log(number[0]); // 1
```
<a id="ancora7"></a>
### Funções:

```
function showMessage(){
  console.log("Hello world");
}

showMessage(); //Hello world
```
