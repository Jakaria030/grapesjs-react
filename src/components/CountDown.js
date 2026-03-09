const CountDown = (editor) => {

    editor.DomComponents.addType('countdown', {
        model: {
            defaults: {
                tagName: "div",
                attributes: { class: "countdown-wrapper" },

                components: `
                <div class="countdown">
                    <span class="dd">00</span>
                    :
                    <span class="mm">00</span>
                    :
                    <span class="yyyy">0000</span>
                    ::
                    <span class="hh">00</span>
                    :
                    <span class="min">00</span>
                    :
                    <span class="ss">00</span>
                </div>
                `,
                script: function () {

                    const el = this;

                    const dd = el.querySelector(".dd");
                    const mm = el.querySelector(".mm");
                    const yyyy = el.querySelector(".yyyy");
                    const hh = el.querySelector(".hh");
                    const min = el.querySelector(".min");
                    const ss = el.querySelector(".ss");

                    const now = new Date();
                    const target = new Date();
                    target.setDate(now.getDate() + 7);

                    function updateCountdown() {

                        const current = new Date();
                        const diff = target - current;

                        if (diff <= 0) return;

                        const totalSeconds = Math.floor(diff / 1000);

                        const year = target.getFullYear();
                        const month = target.getMonth() + 1;
                        const days = Math.floor(totalSeconds / (3600 * 24));
                        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
                        const minutes = Math.floor((totalSeconds % 3600) / 60);
                        const seconds = totalSeconds % 60;

                        dd.innerHTML = String(days).padStart(2, "0");
                        mm.innerHTML = String(month).padStart(2, "0");
                        yyyy.innerHTML = year;

                        hh.innerHTML = String(hours).padStart(2, "0");
                        min.innerHTML = String(minutes).padStart(2, "0");
                        ss.innerHTML = String(seconds).padStart(2, "0");

                    }

                    updateCountdown();
                    setInterval(updateCountdown, 1000);

                }
            }

        }
    });


    // CSS Style
    editor.addStyle(`
    .countdown-wrapper{
      display:flex;
      justify-content:center;
      align-items:center;
      padding:40px;
      font-family:Arial, sans-serif;
    }

    .countdown{
      font-size:28px;
      font-weight:bold;
      background:#222;
      color:#fff;
      padding:20px 30px;
      border-radius:8px;
      letter-spacing:3px;
    }

    .countdown span{
      margin:0 5px;
      color:#1abc9c;
    }
  `);

};

export default CountDown;