<h1 align="center">Introdução à programação WEB</h1>

## Sumário:

- [Variáveis](#ancora1)

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

### Objetos:

```
const user = {
  name: "Fernanda",
  age: 19,
};

console.log(user.name); // Fernanda
```

### Arrays:

```
const numbers = [1, 2, 3, 4];

console.log(number[0]); // 1
```

### Funções:

```
function showMessage(){
  console.log("Hello world");
}

showMessage(); //Hello world
```
