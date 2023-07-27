const BASE_URL = "http://localhost:5000/api";

function generateCupcakePage(cupcake){
    return `
    <section>
        <li>
            ${cupcake.flavor}, ${cupcake.size}, ${cupcake.rating}
            <button>x</button>
        </li>
        <img src=${cupcake.image}>
    </section>
    `
}

async function showCupcakesList(){
    const res = await axios.get(`${BASE_URL}/cupcakes`)
    for(let cupcake of res.data.cupcakes){
        let newCupcake = $(generateCupcakeHTML(cupcake))
        $('#list-cupcakes').append(newCupcake)
    }
}

$('#add-cupcake-form').on('submit', async function(event){
    event.preventDefault();
    let flavor = $('#flavor').val()
    let size = $('#size').val()
    let rating = $('#rating').val()
    let image = $('#image').val()
    const newCupcakeRes = await axios.post(`${BASE_URL}/cupcakes`, {flavor, size, rating, image})
    let newCupcake = $(generateCupcakePage(newCupcakeRes.data.cupcake))
    $('#list-cupcakes').append(newCupcake)
    $('#add-cupcake-form').trigger('reset')
})

$('#cupcakes-list').on('click', '.delete-btn', async function(event){
    event.preventDefault();
    let $cupcake = $(event.target).closest('section')
    let cupcakeId = $cupcake.attr('id')
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`)
    $cupcake.remove()
})

$(showCupcakesList)