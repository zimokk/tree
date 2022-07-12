import OrgChart from "@balkangraph/orgchart.js";

function editForm () {
    this.nodeId = null;
  };

  editForm.prototype.init = function (obj) {
    var that = this;
    this.obj = obj;
    this.editForm = document.getElementById("editForm");
    this.emailInput = document.getElementById("email");
    this.addressInput = document.getElementById("address");
    this.phone1Input = document.getElementById("phone1");
    this.phone2Input = document.getElementById("phone2");
    this.imgInput = document.getElementById("img");
    this.nameInput = document.getElementById("name");
    this.titleInput = document.getElementById("title");
    this.cancelButton = document.getElementById("close");

    this.cancelButton.addEventListener("click", function () {
      that.hide();
    });
  };


  editForm.prototype.show = function (nodeId) {
    this.nodeId = nodeId;

    var left = document.body.offsetWidth / 2 - 150;

    this.editForm.style.left = left + "px";
    var node = chart.get(nodeId);
    if (!node) return;
    this.emailInput.innerHTML = node.email ? node.email : "";
    this.addressInput.innerHTML = node.address ? node.address : "";
    this.phone1Input.innerHTML = node.phones ? node.phones[0] ? node.phones[0].number : "" : "";
    this.phone2Input.innerHTML = node.phones ? node.phones[1] ? node.phones[1].number : "" : "";
    this.imgInput.src = node.img ? node.img : "#";
    this.nameInput.innerHTML = node.name ? node.name : "";
    this.titleInput.innerHTML = node.title ? node.title : "";

    this.editForm.style.display = "block";

    OrgChart.anim(this.editForm, { opacity: 0 }, { opacity: 1 }, 300, OrgChart.anim.inOutSin);
  };

  editForm.prototype.hide = function (showldUpdateTheNode) {
    this.editForm.style.display = "none";
    this.editForm.style.opacity = 0;
  };

  export {editForm};