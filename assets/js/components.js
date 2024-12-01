function loadBarComponent(value, normRatio = 255) {
    const normalizedValue = parseInt(value) / normRatio * 100;
    const color = normalizedValue >= (normRatio/2) ? 'green' : 'red';
    return `
    <span class="charge-bar">
        <span class="bar-value" 
        style="display: block;width: ${normalizedValue}%;height: 5px;background-color: ${color};z-index: 2;"></span>
    </span>
    `;
}


function pokemonDetailComponent(pokemon) {
    return `
        <span class="number">#${pokemon.number}</span>
        <h1 class="name">${pokemon.name}</h1>
        <div class="details">
            <ol class="types">
                ${pokemon.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}
            </ol>
            <div class="pokemon-img">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>
    `;
}


function pokemonToLi(pokemon) {
	const template = `
        <li class="pokemon ${pokemon.type}">
            <a href="detail.html?pokemon=${pokemon.number}" style="text-decoration: none;">    
                ${pokemonDetailComponent(pokemon)}                
            </a>
        </li>
    `;
	return template;
}


function tableComponent(colNames = [], colValues = []) {
    const tableCols = colNames.map(col => `<th>${col}</th>`).join('');    
    const tableValues = colValues;
    
    const tableRows = tableValues.map((row) => {
        const tdRow = row.map((rowValue, index) => {
            return index === 0 ? `<td class="table-index">${rowValue}</td>` : `<td class="table-value">${rowValue}</td>`;
        }).join('');
        return `<tr>${tdRow}</tr>`
    }).join('');

    const tableHead = `<thead><tr>${tableCols}</tr></thead>`;
    const tableBody = `<tbody>${tableRows}</tbody>`;

    const table = `
        <table>
            ${tableHead}
            ${tableBody}
        </table>
    `;
    return table;
}
