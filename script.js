const inputClasse = document.getElementById('classe');
const btnBuscar = document.getElementById('buscar');
const resultado = document.getElementById('resultado');

btnBuscar.addEventListener('click', async () => {
    const classe = inputClasse.value;

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBvpV8xm75nwbjPtFxT4KuIJZPtIKYnn7w", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [
                {text: `Faça um resumo e liste pelo menos 3 habilidades da classe ${classe}`},
              ]
            }]
          })
        }); // Adapte a URL da API
        const data = await response.json();
        const summaryData = data?.candidates[0]?.content?.parts[0]?.text ?? ''

        resultado.innerHTML = `
            <h2>${classe.toUpperCase()}</h2>
            <h3>Resumo</h3>
            <p>${marked.parse(summaryData)}</p>
        `;
    } catch (error) {
        console.error(error);
        resultado.innerHTML = 'Erro ao buscar a classe.';
    }
});