/*-----------JavaScript-------------*/

/*-----Botão para ir para o inicio------*/
var seta = document.getElementById("setainicio");
var scroll_seta_inicio = function () {
    var y = window.scrollY;
    if (y >= 200) {
        seta.className = "seta-inicio-button show";
    } else {
        seta.className = "seta-inicio-button hide";
    }
};
window.addEventListener("scroll", scroll_seta_inicio);