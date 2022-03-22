import * as requests from './requests.js';
import * as parser from './parser.js'
import * as codegen from './elemgen.js'

function set_top_query4npage(page_no) {
    const urls = new requests.SubUrls(null, (25*page_no));
    requests.fetch_url("GET", requests.BASE_URL + urls.browse_query).then(resp => {
        var parsed_data = parser.home_data_parser(JSON.parse(resp))
        const total_pages = parsed_data.slice(-1)[0]
        parsed_data = parsed_data.slice(0, -1).slice(-25 * 4);
        var elem = document.getElementsByClassName("container")[0];
        elem.innerHTML = null;
        var card = null;
        for (var i = 1; i < parsed_data.length; i += 4) {
            card = codegen.gen_card_code(parsed_data[i + 2], parsed_data[i - 1], parsed_data[i + 1], parsed_data[i])
            elem.innerHTML += card;
        }
    })
}

function set_pagination_bar(active, last) {
    var elem = document.getElementsByClassName('pagination')[0];
    elem.innerHTML = null;
    elem.innerHTML += codegen.get_pagination_code(active, last)
}

export { set_top_query4npage, set_pagination_bar };