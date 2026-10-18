document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".content-section");
  const wsSteps = document.querySelectorAll(".interactive-step");
  const wsExplanation = document.getElementById("step-explanation");

  const explanations = {
    "step-handshake": {
      title: "1. Handshake (Bắt tay)",
      content: `Quá trình bắt đầu bằng một yêu cầu HTTP GET từ client, nhưng chứa các header đặc biệt như <strong>Upgrade: websocket</strong>. Nếu server chấp nhận, nó sẽ phản hồi với mã trạng thái 101 (Switching Protocols). Từ đó, kết nối TCP được giữ mở và chuyển sang giao thức WebSocket.`,
    },
    "step-transfer": {
      title: "2. Data Transfer (Truyền dữ liệu)",
      content: `Sau khi bắt tay thành công, cả client và server có thể gửi dữ liệu bất cứ lúc nào. Dữ liệu được đóng gói thành các "frames". Mỗi frame có một header nhỏ gọn chỉ định loại dữ liệu (văn bản, nhị phân) và độ dài, giúp giảm đáng kể overhead so với HTTP.`,
    },
    "step-close": {
      title: "3. Closing (Đóng kết nối)",
      content: `Kết nối được duy trì cho đến khi một trong hai bên quyết định đóng nó. Việc đóng cũng diễn ra thông qua một "handshake" nhỏ bằng cách trao đổi các control frames đặc biệt, đảm bảo cả hai bên đều biết kết nối đã kết thúc một cách hợp lệ.`,
    },
  };

  function updateExplanation(stepId) {
    const explanation = explanations[stepId];
    if (explanation) {
      wsExplanation.innerHTML = `
                        <h4 class="text-xl font-semibold mb-3">${explanation.title}</h4>
                        <p class="text-gray-700 leading-relaxed">${explanation.content}</p>
                    `;
    }
  }

  updateExplanation("step-handshake");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      sections.forEach((section) => {
        section.classList.remove("active");
        if (section.id === targetId.substring(1)) {
          section.classList.add("active");
        }
      });
    });
  });

  wsSteps.forEach((step) => {
    step.addEventListener("click", function () {
      wsSteps.forEach((s) => s.classList.remove("selected"));
      this.classList.add("selected");
      updateExplanation(this.id);
    });
  });

  // Chart.js
  const ctx = document.getElementById("techComparisonChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["WebSocket", "Socket.IO"],
      datasets: [
        {
          label: "Tính năng Tích hợp",
          data: [2, 9],
          backgroundColor: "rgba(56, 189, 248, 0.6)",
          borderColor: "rgba(56, 189, 248, 1)",
          borderWidth: 1,
        },
        {
          label: "Độ phức tạp Triển khai (thấp hơn là tốt hơn)",
          data: [8, 3],
          backgroundColor: "rgba(251, 146, 60, 0.6)",
          borderColor: "rgba(251, 146, 60, 1)",
          borderWidth: 1,
        },
        {
          label: "Hiệu năng Thô (cao hơn là tốt hơn)",
          data: [9, 7],
          backgroundColor: "rgba(74, 222, 128, 0.6)",
          borderColor: "rgba(74, 222, 128, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          max: 10,
          ticks: {
            callback: function (value) {
              return value + "/10";
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "So sánh Đặc tính WebSocket vs. Socket.IO",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.x !== null) {
                label += context.parsed.x + " / 10";
              }
              return label;
            },
          },
        },
      },
    },
  });

  // Event Emitter Diagram Logic
  const emitButtons = document.querySelectorAll("[data-emit-type]");
  const clients = {
    c1: document.getElementById("client1"),
    c2: document.getElementById("client2"),
    c3: document.getElementById("client3"),
    c4: document.getElementById("client4"),
  };
  const lines = {
    l1: document.getElementById("line1"),
    l2: document.getElementById("line2"),
    l3: document.getElementById("line3"),
    l4: document.getElementById("line4"),
  };

  function resetHighlights() {
    Object.values(clients).forEach((c) => c.classList.remove("active"));
    Object.values(lines).forEach((l) => l.classList.remove("active"));
  }

  emitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      resetHighlights();
      const type = button.dataset.emitType;

      if (type === "io.emit") {
        Object.values(clients).forEach((c) => c.classList.add("active"));
        Object.values(lines).forEach((l) => l.classList.add("active"));
      } else if (type === "socket.broadcast.emit") {
        clients.c2.classList.add("active");
        clients.c3.classList.add("active");
        clients.c4.classList.add("active");
        lines.l2.classList.add("active");
        lines.l3.classList.add("active");
        lines.l4.classList.add("active");
      } else if (type === "io.to(room).emit") {
        clients.c1.classList.add("active");
        clients.c2.classList.add("active");
        clients.c4.classList.add("active");
        lines.l1.classList.add("active");
        lines.l2.classList.add("active");
        lines.l4.classList.add("active");
      }
    });
  });
});
