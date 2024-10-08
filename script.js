// Cotação de moedas do dia.
const USD = 5.66
const EUR = 6.13
const GBP = 7.29

// Obtendo os elementos de formulários.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// manipulando o input amount para receber apenas numeros.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g

  amount.value = amount.value.replace(hasCharactersRegex, "" )
})

// Captando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break;    
    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break;    
    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break;
  }
}

// Função para converter a moeda.
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`  

    // Calcula o total.
    let total = amount * price

    // Verifica se o resultado não é número.
    if (isNaN (total)) {
      return alert ("Por favor, digite o valor corretamente para converter.")
    }

    // Formata o valor total.
    total = formatCurrencyBRL(total).replace("r$", "")

    // Exibe o rsultado total.
    result.textContent = `${total} Reais`


    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result")
  } catch (error) {     
    // Remover a classe do footer removandoo ele da tela.
    footer.classList.remove("show-result")

    console.log(error);
    alert("Não foi possível converter. tente novamente mais tarde.")
  }
}

// formata a moeda em Real brasileiro.
function formatCurrencyBRL(value) {
  // Converte para numero para utilizar o toLocalString para formatar no padrão BRL (R$ 00,00).
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}