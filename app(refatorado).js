/*VALIDAÇÕES DE ELEMENTOS HTML*/
const form = document.querySelector('form')
const button = document.querySelector('button')
const inputUsername = document.querySelector('#username')

/*REGEXs QUE IREMOS USAR*/
const usernameRegex = /^[a-zA-Z]{6,}$/

/*O TEST DA REGEX*/
const testUsername = inputValue => usernameRegex.test(inputValue)

/*PARAGRAFOS QUE CRIAMOS EM CADA EVENTLISTENER*/
const paragraphUsernameFeedback = document.createElement('p')
const paragraphSubmitFeedback = document.createElement('p')

/*CLASSES PADRÃO DE IDENTIFICAÇÃO DOS Ps CRIADOS*/
paragraphUsernameFeedback.setAttribute('data-feedback', 'username-feedback')
paragraphSubmitFeedback.setAttribute('data-feedback', 'submit-feedback')

/*FUNÇÕES COM AS INFORMÇÕES DOS Ps*/
const insertParagraphIntoDOM = paragraphInfo => {
    const { paragraph, text, className, previousSibling } = paragraphInfo
    paragraph.textContent = text
    paragraph.setAttribute('class', className)
    previousSibling.insertAdjacentElement('afterend', paragraph)    
}
const removeSubmitParagraph = () => {
    const paragraphSubmitFeedbackExists = document
    .querySelector('[data-feedback="submit-feedback"]')

    if(paragraphSubmitFeedbackExists){
        paragraphSubmitFeedback.remove()
    }
}

/*OBJETOS QUE ORGANIZAM OS DADOS QUE USAREMOS NAS FUNCs E NOS EVENTSLISTENERS*/
const validUsernameInfo = {
    paragraph: paragraphUsernameFeedback,
    text: 'Username válido =)',
    className: 'username-sucess-feedback',
    previousSibling: inputUsername
}
const invalidUsernameInfo = {
    paragraph: paragraphUsernameFeedback,
    text: `O valor deve conter no mínimo 6 caracteres, com apenas letras maiúsculas e/ou minúsculas`,
    className: 'username-help-feedback',
    previousSibling: inputUsername
}
const invalidSubmitInfo = {
    paragraph: paragraphSubmitFeedback,
    text: 'Por favor, insira um username válido',
    className: 'submit-help-feedback',
    previousSibling: button
}
const validSubmitInfo = {
    paragraph: paragraphSubmitFeedback,
    text: 'Dados enviados =)',
    className: 'submit-sucess-feedback',
    previousSibling: button
}

/*FUNÇÕES COM OS EVENTS DOS EVENTSLISTENERS*/
const showUsernameInfo = event => {
    const isUsernameValid = testUsername(event.target.value)

    removeSubmitParagraph()

    if(!isUsernameValid){
        insertParagraphIntoDOM(invalidUsernameInfo)
        return    
    }

    insertParagraphIntoDOM(validUsernameInfo)
}
const showSubmitInfo = event => {
    event.preventDefault()

    const isUsernameValid = testUsername(inputUsername.value)

    if(!isUsernameValid){
        insertParagraphIntoDOM(invalidSubmitInfo)
        return
    }

    insertParagraphIntoDOM(validSubmitInfo)
}

/*EVENTSLISTENERS COM OS TIPOS DE EVENTO E AS FUNÇÕES COM CADA EVENT*/
inputUsername.addEventListener('input', showUsernameInfo)
form.addEventListener('submit', showSubmitInfo)