function showNotification(pesan) {
  if (Notification.permission === "granted") {
    new Notification(pesan);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(pesan);
      }
    });
  }
}

function tampilkanPesanDanNotif() {
  let sekarang = new Date();
  let jam = sekarang.getHours();
  let pesan = "";

  if (jam >= 6 && jam < 12) {
    pesan = "SELAMAT PAGI ZIRA!!\nJANGAN LUPA SARAPAN YA";
  } else if (jam >= 12 && jam < 18) {
    pesan =
      "SELAMAT SIANG ZIRA!!\nJANGAN LUPA BERSIAP UNTUK KERJA YAA, SEMANGAT!!!";
  } else {
    pesan =
      "SELAMAT MALAM ZIRA!!!\nKALO DA SIAP KERJANYA, ISTIRAHAT YANG CUKUP YAA";
  }

  // Menampilkan pesan di halaman
  document.getElementById("pesan").innerText = pesan;

  // Menampilkan notifikasi
  showNotification(pesan);
}

// Minta izin notifikasi saat halaman dimuat
if ("Notification" in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      tampilkanPesanDanNotif();
    }
  });
}

// Tambahkan Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js").then(
      function (registration) {
        console.log("Service Worker terdaftar dengan sukses:", registration);
      },
      function (error) {
        console.log("Pendaftaran Service Worker gagal:", error);
      }
    );
  });
}
