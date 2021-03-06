$("#franchise-index").ready(function() {
  compileIndexTemplate();
  compileDetailsTemplate();
  renderIndex();
});

function compileIndexTemplate() {
  indexTemplate = Handlebars.compile($("#franchise-index-template")[0].innerHTML);
};

function compileDetailsTemplate() {
  detailsTemplate = Handlebars.compile($("#franchise-details-template")[0].innerHTML);
};

function renderIndex() {
  $.getJSON("/franchises", function(data) {
    const franchises = data.map(f => new Franchise(f))
    appendIndex(franchises);
    addLinkListeners();
  });
};

function appendIndex(franchises) {
  $("#franchise-index").append(indexTemplate(franchises));
}

function addLinkListeners() {
  $("ol li a").each(function() {
    this.addEventListener("click", function(event) {
      event.preventDefault();
      $.getJSON(this, function(data) {
        const franchise = new Franchise(data);
        if (detailsNotAppended(franchise.id)) {
          appendDetails(franchise);
        };
      });
    });
  });
};

function appendDetails(franchise) {
  $("li#" + franchise.id).append(detailsTemplate(franchise));
}

function detailsNotAppended(id) {
  return $("#franchise-details-" + id).length === 0;
}

