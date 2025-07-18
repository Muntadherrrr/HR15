!(function (e) {
  "use strict";
  async function t(t) {
    await dsnGrid.destoryBuild(),
      await a("poster"),
      await a("src"),
      await a("srcset"),
      await a("bg"),
      await void e("[data-dsn-position]").each(function () {
        "IMG" === this.nodeName
          ? e(this).css(
              "object-position",
              dsnGrid.getData(this, "position", "center")
            )
          : e(this).css(
              "background-position",
              dsnGrid.getData(this, "position", "center")
            );
      }),
      await void e("[data-dsn-color]").each(function () {
        e(this).attr("style", "--mod-color:" + dsnGrid.getData(this, "color"));
      }),
      t ||
        ((window.$effectScroll = await (function () {
          const t = window.Scrollbar;
          var n = document.querySelector("#dsn-scrollbar");
          return {
            start: function () {
              $body.removeClass("locked-scroll"),
                dsnGrid.scrollTop(0),
                this.isScroller(!0) &&
                  (t.init(n, {
                    damping: 0.06,
                    renderByPixels: !0,
                    continuousScrolling: !1,
                  }),
                  $body.addClass("dsn-scroll-active"),
                  this.contactForm());
            },
            contactForm: function () {
              const n = e(".contact-modal .contact-container");
              n.length && t.init(n.get(0), { damping: 0.06 });
            },
            isScroller: function (e) {
              e && (n = document.querySelector("#dsn-scrollbar"));
              let t =
                !$body.hasClass("dsn-effect-scroll") ||
                dsnGrid.isMobile() ||
                null === n;
              return t && e && $body.addClass("dsn-mobile"), !t;
            },
            locked: function () {
              if (($body.addClass("locked-scroll"), this.isScroller())) {
                let e = this.getScrollbar();
                void 0 !== e && e.destroy(), (e = null);
              }
            },
            getScrollbar: function (e) {
              return void 0 === e ? t.get(n) : t.get(document.querySelector(e));
            },
            getListener: function (e, t = !0) {
              if (void 0 === e) return;
              let n = this;
              n.isScroller()
                ? n.getScrollbar().addListener(e)
                : t && $wind.on("scroll", e),
                (n = null);
            },
            scrollNavigate: function () {
              let t = e(".wrapper").offset();
              (t = t ? t.top : 0),
                e(".scroll-top , .scroll-to-top").on("click", function () {
                  dsnGrid.scrollTop(0, 2);
                }),
                e(".scroll-d").on("click", function () {
                  dsnGrid.scrollTop(
                    t,
                    2,
                    -1 * e(".scrollmagic-pin-spacer").height() - 200 || -200
                  );
                });
            },
          };
        })()),
        (window.$animate = await (function () {
          const t = Linear.easeNone;
          return {
            allInt: function () {
              this.clearControl()
                .then(() => {
                  this.parallaxImgHover();
                })
                .then(() => {
                  this.headerPages();
                })
                .then(() => {
                  this.animations();
                })
                .then(() => {
                  this.parallaxMulti();
                })
                .then(() => {
                  this.parallaxImg();
                })
                .then(() => {
                  this.moveSection();
                })
                .then(() => {
                  this.nextProject();
                })
                .then(() => {
                  this.translateSection();
                })
                .then(() => {
                  this.dsnScrollTop();
                })
                .then(() => {
                  $effectScroll.scrollNavigate();
                });
            },
            clearControl: async function () {
              $controller.destroy(!0),
                ($controller = new ScrollMagic.Controller());
            },
            nextProject: function () {
              const t = e(".next-project"),
                n = t.find(".has-box-mod .icon-circle"),
                i = { value: 0 },
                a = gsap.timeline();
              t.find(".bg-container").length &&
                a.to(
                  i,
                  {
                    value: 60,
                    onUpdate: function () {
                      t.find(".bg-container").css(
                        "clip-path",
                        "circle(" +
                          i.value +
                          "% at 70% " +
                          (i.value - 20) +
                          "%)"
                      );
                    },
                  },
                  0
                ),
                n.length &&
                  (a.fromTo(n, { width: 0 }, { width: "100%" }, 0),
                  n.css("transition", "none")),
                t.find("img").length &&
                  a.from(t.find("img"), { scale: 1.5, ease: "none" }, 0),
                t.find(".w-100.pt-30.d-flex.justify-content-between").length &&
                  a.from(
                    t.find(".w-100.pt-30.d-flex.justify-content-between"),
                    { autoAlpha: 0, ease: "none" },
                    0
                  ),
                dsnGrid
                  .tweenMaxParallax($controller)
                  .addParrlax({ id: t, triggerHook: 1, tween: a });
            },
            parallaxImg: async function () {
              let t = this;
              e('[data-dsn-grid="move-up"]').each(function () {
                const n = gsap.timeline({ yoyo: !0 });
                t.tweenImage(e(this), n);
                let i = dsnGrid
                  .tweenMaxParallax($controller)
                  .addParrlax({
                    id: this,
                    triggerHook: dsnGrid.getData(this, "triggerhook", 1),
                    duration: dsnGrid.getData(this, "duration", "200%"),
                    tween: n,
                  });
                i && $scene.push(i), (i = null);
              });
            },
            tweenImage: function (e, n) {
              let i = e.find("img:not(.hidden) , video");
              if ((e.attr("data-dsn-grid", "moveUp"), i.length > 0)) {
                let a = dsnGrid.getData(i, "speed", "180"),
                  s = {
                    scale: 1,
                    y: i.hasClass("has-opposite-direction")
                      ? "-=" + a
                      : "+=" + a,
                    skewY: 0,
                    yoyo: !0,
                    ease: t,
                    overwrite: "none",
                  };
                gsap.set(
                  i,
                  {
                    height: "+=" + a,
                    top: i.hasClass("has-opposite-direction") ? 0 : "-=" + a,
                  },
                  0
                ),
                  i.hasClass("has-scale") && (s.scale = 1.1),
                  i.css("perspective", e.width() > 1e3 ? 1e3 : e.width()),
                  n.to(i, 1, s, 0);
              }
            },
            parallaxMulti: async function () {
              let t = this;
              e("[data-dsn-animate-multi]").each(function () {
                dsnGrid.getData(this, "animate-multi");
                const n = gsap.timeline({ yoyo: !0, overwrite: "none" });
                e(this)
                  .find('[data-dsn-grid="move-up"]')
                  .each(function () {
                    t.tweenImage(e(this), n);
                  }),
                  e(this)
                    .find('[data-dsn-grid="move-section"]')
                    .each(function () {
                      t.tweenMoveSection.bind(this, n)();
                    });
                let i = dsnGrid.getData(this, "duration", "200%"),
                  a = dsnGrid.getData(this, "triggerhook", 1);
                0 == i && (i = e(this).outerHeight() * (a + 1));
                let s = dsnGrid
                  .tweenMaxParallax($controller)
                  .addParrlax({
                    id: this,
                    triggerHook: a,
                    duration: i,
                    tween: n,
                  });
                s && $scene.push(s), (s = null);
              });
            },
            animations: async function () {
              let n = this;
              e('[data-dsn-animate="section"]').each(function () {
                dsnGrid.getData(this, "animate");
                const i = {
                  $this: e(this),
                  gsap: gsap.timeline({
                    paused: !0,
                    ease: t,
                    overwrite: "none",
                  }),
                };
                n.animateFade(i, e(this).find(".dsn-up"))
                  .then(() => {
                    n.animateText(i, e(this).find(".dsn-text"));
                  })
                  .then(() => {
                    e(this).find(".line").length && n.animateLine(i);
                  })
                  .then(() => {
                    n.animateSkills(i, e(this).find(".skills-item .fill"));
                  })
                  .then(() => {
                    n.animateNumbers(i, e(this).find(".has-animate-number"));
                  })
                  .then(() => {
                    i.gsap._totalDuration = 1;
                    const t = dsnGrid
                      .tweenMaxParallax()
                      .addParrlax({
                        id: this,
                        reverse: !1,
                        triggerHook: 0.5,
                        duration: 0,
                        tween: i.gsap,
                      });
                    i.$this.find(".circular-item .circle").length &&
                      (i.$this
                        .find(".circular-item .circle")
                        .circleProgress({
                          size: 160,
                          lineCap: "round",
                          startAngle: -Math.PI,
                          fill: { gradient: ["#11468b", "#930f0a"] },
                        }),
                      t.on("start", function () {
                        i.$this
                          .find(".circular-item .circle")
                          .circleProgress({})
                          .on("circle-animation-progress", function (t, n) {
                            e(this)
                              .find("h4")
                              .html(
                                Math.round(t.target.dataset.value * n * 100) +
                                  "%"
                              );
                          });
                      }));
                  });
              });
            },
            animateFade: async function (e, t, n = 0) {
              t.length &&
                e.gsap.staggerFromTo(
                  t,
                  0.8,
                  { y: 20, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    delay: n,
                    overwrite: "none",
                    ease: Back.easeOut.config(1.7),
                  },
                  0.2,
                  0
                );
            },
            animateText: function (t, n) {
              n.length &&
                n.each(function () {
                  dsnGrid.convertTextLine(this, "words"),
                    e(this).addClass("overflow-hidden"),
                    t.gsap.staggerFrom(
                      e(this).find(".dsn-word-wrapper"),
                      0.6,
                      {
                        willChange: "transform",
                        transformOrigin: "left",
                        opacity: 0,
                        scaleX: 2,
                        ease: Back.easeOut.config(2),
                      },
                      0.1,
                      0
                    );
                });
            },
            animateLine: function (e, t) {
              e.gsap.addLabel("line", 0),
                e.$this.find(".line.line-top").length &&
                  e.gsap.from(
                    e.$this.find(".line.line-top").toArray(),
                    1,
                    { scaleX: 0, transformOrigin: "right" },
                    "line"
                  ),
                e.$this.find(".line.line-left").length &&
                  e.gsap.from(
                    e.$this.find(".line.line-left").toArray(),
                    1,
                    { scaleY: 0, transformOrigin: "top" },
                    "line+=1"
                  ),
                e.$this.find(".line.line-bottom").length &&
                  e.gsap.from(
                    e.$this.find(".line.line-bottom").toArray(),
                    1,
                    { scaleX: 0, transformOrigin: "left" },
                    "line+=2"
                  ),
                e.$this.find(".line.line-right").length &&
                  e.gsap.from(
                    e.$this.find(".line.line-right").toArray(),
                    1,
                    { scaleY: 0, transformOrigin: "bottom" },
                    "line+=3"
                  );
            },
            animateSkills: function (t, n) {
              n.each(function (n) {
                let i = e(this);
                t.gsap.to(
                  i,
                  1,
                  {
                    width: i.data("width"),
                    onUpdate: function () {
                      i.find(".number").text(
                        ((i.width() / i.parent().width()) * 100).toFixed(0) +
                          "%"
                      );
                    },
                    onComplete: function () {
                      i = null;
                    },
                  },
                  0.2 * n
                );
              });
            },
            animateNumbers: function (t, n) {
              t.gsap.addLabel("number", 0),
                n.each(function (n) {
                  let i = e(this),
                    a = { value: 0 };
                  t.gsap.to(
                    a,
                    4,
                    {
                      value: i.text(),
                      ease: Back.easeOut.config(1.2),
                      onUpdate: function () {
                        i.text(dsnGrid.numberText(a.value.toFixed(0)));
                      },
                      onComplete: function () {
                        i = a = null;
                      },
                    },
                    "number+=" + 0.2 * n
                  );
                });
            },
            headerPages: function () {
              e(".dsn-header-animation").each(function () {
                let n = e(this),
                  i = n.find(".dsn-hero-parallax-img"),
                  a = e(".main-root > .p-fixed.has-parallax-header > *"),
                  s = n.find(".dsn-hero-parallax-title"),
                  o = !1,
                  r = "100%";
                const l = gsap.timeline();
                if (
                  (i.length
                    ? l.to(
                        i,
                        { y: "30%", yoyo: !0, ease: t, overwrite: "none" },
                        0
                      )
                    : a.length &&
                      (dsnGrid.isMobile()
                        ? l.to(
                            a,
                            {
                              opacity: 0,
                              yoyo: !0,
                              ease: t,
                              overwrite: "none",
                            },
                            0
                          )
                        : l.to(
                            a,
                            {
                              width: e(".side-bar-full").outerWidth(),
                              yoyo: !0,
                              ease: t,
                              overwrite: "none",
                            },
                            0
                          ),
                      (o = !0),
                      (r = 750)),
                  s.length)
                ) {
                  let e = dsnGrid.isMobile() ? 80 : 120;
                  l.to(
                    s,
                    {
                      y: o
                        ? s.parent().height() - s.height() - s.offset().top - e
                        : 150,
                      yoyo: !0,
                      autoAlpha: o ? 1 : 0,
                      ease: t,
                      overwrite: "none",
                    },
                    0
                  );
                }
                dsnGrid
                  .tweenMaxParallax($controller)
                  .addParrlax({
                    id: this,
                    triggerHook: 0,
                    duration: r,
                    tween: l,
                    _fixed: o,
                  }),
                  (i = n = void 0);
              });
            },
            moveSection: function () {
              let t = this;
              e('[data-dsn-grid="move-section"]').each(function () {
                let n = e(this);
                const i = gsap.timeline({ yoyo: !0 });
                t.tweenMoveSection.bind(this, i)();
                const a = dsnGrid
                  .tweenMaxParallax($controller)
                  .addParrlax({
                    id: this,
                    triggerHook: dsnGrid.getData(n, "triggerhook", 1),
                    duration: dsnGrid.getData(n, "duration", "150%"),
                    tween: i,
                  });
                $scene.push(a), (n = null);
              });
            },
            tweenMoveSection: function (n) {
              let i = e(this);
              dsnGrid.getData(this, "grid"),
                i.addClass("dsn-move-section"),
                ("tablet" === dsnGrid.getData(this, "responsive") &&
                  dsnGrid.isMobile()) ||
                  n.to(
                    i,
                    1,
                    {
                      y: dsnGrid.getData(i, "move", -150),
                      autoAlpha: dsnGrid.getData(
                        i,
                        "opacity",
                        i.css("opacity")
                      ),
                      ease: t,
                      overwrite: "none",
                    },
                    0
                  );
            },
            parallaxImgHover: function () {
              dsnGrid.isMobile() ||
                e('[data-dsn="parallax"]').each(function () {
                  let t = e(this);
                  t.removeAttr("data-dsn"),
                    dsnGrid.parallaxMoveElement(
                      t,
                      dsnGrid.getData(t, "move", 20),
                      dsnGrid.getData(t, "speed", 0.5),
                      t.find(".dsn-parallax-rev").get(0),
                      t.hasClass("image-zoom")
                    ),
                    (t = null);
                });
            },
            dsnScrollTop: function () {
              const n = e(".inner-content");
              if (!n.length || !e(".scroll-to-top").length) return;
              const i = gsap.timeline();
              e(".text-stroke-box > .text-stroke-inner").each(function () {
                if (!e(this).text()) return;
                let t =
                  e(this).text() +
                  " <span class='letter-stroke'>" +
                  e(this).text() +
                  "</span> ";
                e(this).html(t.repeat(4)),
                  e(this).hasClass("dsn-animate") ||
                    gsap.set(this, {
                      y: -1 * e(this).height() + e(this).parent().height(),
                    });
              }),
                i.to(
                  ".scroll-to-top > img",
                  1,
                  { rotation: n.height() / 2, ease: t },
                  0
                ),
                i.to(
                  ".text-stroke-box > .text-stroke-inner:not(.dsn-animate)",
                  1,
                  { y: 0 },
                  0
                );
              const a = dsnGrid
                .tweenMaxParallax($controller)
                .addParrlax({
                  id: n,
                  triggerHook: 0,
                  offset: dsnGrid.isMobile() ? 200 : 2,
                  duration: dsnGrid.getHeightScroll(),
                  tween: i,
                });
              a.on("progress", function (t) {
                e(".scroll-to-top .box-number span").text(
                  (100 * t.progress).toFixed(0) + "%"
                );
              }),
                dsnGrid.isMobile()
                  ? (a.on("enter", function () {
                      a.duration(dsnGrid.getHeightScroll() - 400),
                        gsap.to(".scroll-to-top", { right: 20 });
                    }),
                    a.on("leave", function () {
                      dsnGrid.isMobile()
                        ? gsap.to(".scroll-to-top", { right: -150 })
                        : a.duration(dsnGrid.getHeightScroll());
                    }))
                  : a.on("enter", function () {
                      a.duration(dsnGrid.getHeightScroll());
                    });
            },
            translateSection: function () {
              e(
                ".section-image.section-move-image .transform-move-section"
              ).each(function () {
                const t = gsap.timeline();
                let n = 0;
                e(this)
                  .find(".swiper-slide")
                  .each(function () {
                    n += e(this).outerWidth();
                  }),
                  e(this).append(e(this).find(".swiper-slide").clone()),
                  e(this).append(e(this).find(".swiper-slide").clone()),
                  (n -= e(this).width()),
                  e(this).hasClass("move-left")
                    ? t.to(this, { x: -1 * n })
                    : t.from(this, { x: -1 * n });
                let i = dsnGrid
                  .tweenMaxParallax($controller)
                  .addParrlax({
                    id: this,
                    triggerHook: dsnGrid.getData(this, "triggerhook", 1),
                    duration: dsnGrid.getData(this, "duration", "200%"),
                    tween: t,
                  });
                i && $scene.push(i);
              });
            },
          };
        })()),
        await (function () {
          const t = e(".site-header");
          return {
            init: function () {
              if (!t.length) return;
              this.cutterText(), this.hamburgerOpen();
            },
            cutterText: function () {
              let e = t.find(".menu-icon .text-menu");
              if (e.length <= 0) return;
              let n = e.find(".text-button"),
                i = e.find(".text-open"),
                a = e.find(".text-close");
              dsnGrid.convertTextLine(n),
                dsnGrid.convertTextLine(i),
                dsnGrid.convertTextLine(a),
                (a = null),
                (i = null),
                (n = null),
                (e = null);
            },
            hamburgerOpen: function () {
              const n = t.find(".menu-icon"),
                i = t.find(".main-navigation");
              let a = gsap.timeline({
                paused: !0,
                onReverseComplete: function () {
                  setTimeout(function () {
                    n.find(".icon-top , .icon-bottom")
                      .css("transform", "")
                      .css("display", "");
                  }, 50),
                    console.log("onReverseComplete : tl");
                },
              });
              var s = gsap.timeline({
                onReverseComplete: function () {
                  (s = gsap.timeline()),
                    console.log("onReverseComplete : menuClick");
                },
              });
              let o = Power3.easeOut;
              a.set(n.find(".icon-center"), {}),
                a.to(n.find(".icon-top"), 0.5, {
                  width: 23,
                  rotation: 0,
                  top: 0,
                  ease: o,
                }),
                a.to(
                  n.find(".icon-bottom"),
                  0.5,
                  { width: 23, rotation: 0, top: 0, ease: o },
                  0
                ),
                a.call(function () {
                  n.toggleClass("nav-active");
                }, 0),
                a.to(i, 0.5, { y: "0%", autoAlpha: 1, ease: o }, 0),
                a.fromTo(
                  i,
                  0.5,
                  { y: "-100%", autoAlpha: 0 },
                  { y: "0%", autoAlpha: 1, ease: Expo.easeInOut },
                  0
                ),
                a.staggerTo(
                  i.find("ul.extend-container > li > a .dsn-title-menu"),
                  0.5,
                  { autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.7) },
                  0.05
                ),
                a.set(i.find("ul.extend-container > li > a .dsn-meta-menu"), {
                  autoAlpha: 1,
                  ease: o,
                }),
                a.to(i.find(".container-content"), 1, { autoAlpha: 1 }, "-=1"),
                a.reverse(),
                i
                  .find("ul.extend-container > li.dsn-drop-down")
                  .on("click", function (t) {
                    t.stopPropagation(),
                      s._tDur > 0 ||
                        ((s = gsap.timeline({
                          onReverseComplete: function () {
                            s = gsap.timeline();
                          },
                        })).set(e(this).find("ul"), { display: "flex" }),
                        s.to(
                          i
                            .find("ul.extend-container > li > a ")
                            .find(".dsn-title-menu , .dsn-meta-menu"),
                          0.5,
                          {
                            y: -30,
                            autoAlpha: 0,
                            ease: Back.easeIn.config(1.7),
                          }
                        ),
                        s.set(
                          ".site-header .extend-container .main-navigation ul.extend-container li",
                          { overflow: "hidden" }
                        ),
                        s.staggerFromTo(
                          e(this).find("ul li"),
                          0.5,
                          { x: 50, autoAlpha: 0 },
                          {
                            x: 0,
                            autoAlpha: 1,
                            ease: Back.easeOut.config(1.7),
                          },
                          0.1
                        ));
                  }),
                n.off("click"),
                n.on("click", function () {
                  console.log("mainIcon:click"),
                    a.isActive() ||
                      (s.reverse(-1),
                      a.reversed(!a.reversed()),
                      (s = gsap.timeline()));
                });
              let r = e(".dsn-back-menu");
              r.off("click"),
                r.on("click", function (e) {
                  console.log("backMenu:click"),
                    e.stopPropagation(),
                    s.reverse();
                });
            },
          };
        })().init(),
        await dsnGrid.removeWhiteSpace(
          ".site-header ul.extend-container li > a"
        ),
        await void e(".day-night").on("click", function () {
          dsnGrid.changeColor(),
            dsnGrid.setStyle($body.hasClass("v-dark") ? "dark" : "light");
        })),
      t && (await s(t)),
      await e("a.vid").YouTubePopUp(),
      await (function (t) {
        const n = e(".contact-btn");
        t && n.off("click");
        n.on("click", () => {
          $body.toggleClass("dsn-show-contact");
        });
      })(t),
      await (function (t) {
        const n = e(".stories-btn ");
        t && n.off("click");
        n.on("click", () => {
          $body.toggleClass("dsn-show-stories");
        }),
          e(".close-story").on("click", () =>
            $body.removeClass("dsn-show-stories")
          );
      })(t),
      await void e(".projects-list.gallery.work-hover .work-item").each(
        function () {
          dsnGrid.convertTextLine(e(this).find(".sec-title"));
        }
      ),
      await $effectScroll.start(),
      await (function () {
        $wind.off("scroll");
        const t = e(".wrapper");
        let n = 0;
        var i = t.offset(),
          a = t.find("> *:first-child"),
          s = 0;
        a.length &&
          (i =
            "HEADER" === a.get(0).nodeName
              ? a.outerHeight()
              : void 0 !== i
              ? i.top
              : 70);
        $effectScroll.getListener(function (e) {
          (n = "scroll" === e.type ? $wind.scrollTop() : e.offset.y),
            i > 170 && (i -= 100),
            n > i
              ? s < n
                ? $body.addClass("nav-bg").addClass("hide-nav")
                : $body.removeClass("hide-nav")
              : $body.removeClass("nav-bg").removeClass("hide-nav"),
            (s = n);
        });
      })(),
      await $animate.allInt(),
      await (function () {
        const t = e(".main-slider");
        let n = gsap.timeline();
        return {
          run: async function () {
            let i = this;
            t.each(function () {
              let a = e(this),
                s = a.hasClass("has-horizontal"),
                o = a.find(".slide-inner");
              o.hasClass("dsn-webgl")
                ? i.initWebgel(e(this)).then((e) => {
                    t
                      .find(".control-nav .slider-total-index")
                      .html(dsnGrid.numberText(e.imgs.length)),
                      gsap.set(
                        t.find(
                          ".swiper-pagination-control > .swiper-pagination-progressbar-fill"
                        ),
                        { scale: 1 / e.imgs.length }
                      ),
                      t
                        .find(".swiper-pagination-control")
                        .addClass("swiper-pagination-progressbar"),
                      dsnGrid.WebGLDistortionHoverEffects(e, {
                        parent: o,
                        vertical: !s,
                        nextEl: t.find(".swiper-button-next"),
                        prevEl: t.find(".swiper-button-prev"),
                        onComplete: function () {},
                        onStart: function (n, a) {
                          i.slideChangeWeb(
                            t,
                            s ? "x" : "y",
                            n,
                            a,
                            this.mat.uniforms.effectFactor.value < 0
                          ),
                            gsap.to(
                              t.find(
                                ".swiper-pagination-control > .swiper-pagination-progressbar-fill"
                              ),
                              { scale: (n + 1) / e.imgs.length }
                            );
                        },
                      });
                  })
                : o.find(".swiper-slide").length &&
                  i.initSlider(a).then(function (e) {
                    let t = i.swiperObject(a, !s);
                    i.slideChange(t, a, s ? "x" : "y"),
                      dsnGrid.addSwiper(t),
                      a.find(".swiper-button-next").on("click", function () {
                        n.isActive() ||
                          (t.slides.length === t.activeIndex + 1
                            ? t.slideTo(0)
                            : t.slideNext());
                      }),
                      a.find(".swiper-button-prev").on("click", function () {
                        n.isActive() ||
                          (0 === t.activeIndex
                            ? t.slideTo(t.slides.length)
                            : t.slidePrev());
                      });
                  });
            });
          },
          initSlider: async function (t) {
            t.find(".swiper-slide").each(function (n) {
              let i = e(this);
              i.attr("data-dsn-id", n);
              let a = e(this).find(".slide-content");
              a.attr("data-dsn-id", n),
                0 === n && a.addClass("dsn-active dsn-active-cat"),
                t.find(".dsn-slider-content > .dsn-container").append(a);
              let s = a.find(".title");
              s.find("a").length && (s = s.find("a")),
                dsnGrid.convertTextLine(s),
                (i = a = s = null);
            });
          },
          swiperObject: function (t, n = !0) {
            return new Swiper(t.find(".slide-inner").get(0), {
              speed: 1500,
              grabCursor: !0,
              allowTouchMove: !0,
              direction: n ? "vertical" : "horizontal",
              slidesPerView: 1,
              centeredSlides: true,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false,
              },
              parallax: !0,
              loopAdditionalSlides: 10,
              watchSlidesProgress: !0,
              watchSlidesVisibility: !0,
              spaceBetween: n && t.hasClass("demo-2") ? 30 : 0,
              pagination: {
                el: t.find(".swiper-pagination-control").get(0),
                type: "progressbar",
                clickable: !0,
              },
              on: {
                init: function () {
                  this.autoplay.stop();
                  let i = this;
                  t
                    .find(".slider-total-index")
                    .html(dsnGrid.numberText(i.slides.length)),
                    t.find('[data-dsn="video"] video').each(function () {
                      this.pause();
                    }),
                    (this.touchEventsData.formElements = "*"),
                    t.find("[data-swiper-parallax]").each(function () {
                      let t = e(this)
                        .attr("data-swiper-parallax")
                        .replace("%", "");
                      e(this).attr({
                        "data-swiper-parallax":
                          (t / 100) * (n ? i.height : i.width),
                      });
                    });
                },
                touchStart: function () {
                  e(this.slides).css("transition", ""),
                    !dsnGrid.isMobile() &&
                      $body.hasClass("dsn-cursor-effect") &&
                      (e(this.slides)
                        .parents(".main-slider")
                        .hasClass("has-horizontal")
                        ? e(".cursor").addClass(
                            "cursor-scale-half cursor-drag cursor-next cursor-prev"
                          )
                        : e(".cursor").addClass(
                            "cursor-scale-half cursor-up-down cursor-drag cursor-next cursor-prev"
                          ));
                },
                touchEnd: function () {
                  !dsnGrid.isMobile() &&
                    $body.hasClass("dsn-cursor-effect") &&
                    (e(this.slides).hasClass("has-horizontal")
                      ? e(".cursor").removeClass(
                          "cursor-scale-half cursor-drag cursor-next cursor-prev"
                        )
                      : e(".cursor").removeClass(
                          "cursor-scale-half cursor-up-down cursor-drag cursor-next cursor-prev"
                        ));
                },
              },
            });
          },
          slideChange: function (t, i, a) {
            let s = this;
            t.on("slideChange", async function () {
              let o = i.find(".dsn-slider-content .dsn-active"),
                r = o.data("dsn-id");
              i.find(".slider-current-index").html(
                dsnGrid.numberText(t.activeIndex + 1)
              );
              let l = e(t.slides[t.activeIndex]),
                d = l.data("dsn-id");
              if (r === d) return;
              i.find('[data-dsn="video"] video').each(function () {
                this.pause();
              });
              let c = e(this.slides[this.activeIndex]).find(
                '[data-dsn="video"] video'
              );
              c.length && c.get(0).play();
              let f = o.find(".dsn-chars-wrapper");
              o.removeClass("dsn-active-cat");
              let h = i.find('.dsn-slider-content [data-dsn-id="' + d + '"]'),
                u = h.find(".dsn-chars-wrapper"),
                p = r > d;
              n.progress(1),
                (n = new gsap.timeline()),
                n.staggerFromTo(
                  p ? f.toArray().reverse() : f,
                  0.3,
                  s.showText(a).title,
                  s.hideText(p, a).title,
                  0.05,
                  0,
                  function () {
                    i
                      .find(".dsn-slider-content .slide-content")
                      .removeClass("dsn-active")
                      .removeClass("dsn-active-cat"),
                      h.addClass("dsn-active"),
                      h.addClass("dsn-active-cat");
                  }
                ),
                n.staggerFromTo(
                  p ? u.toArray().reverse() : u,
                  0.8,
                  s.hideText(!p, a).title,
                  s.showText(a).title,
                  0.05,
                  "-=.1"
                ),
                (o = r = l = d = c = f = u = p = null);
            });
          },
          slideChangeWeb: function (e, t, i, a, s) {
            e.find(".slider-current-index").html(dsnGrid.numberText(i + 1));
            let o = e
                .find(".dsn-slider-content .dsn-active")
                .find(".dsn-chars-wrapper"),
              r = e.find('.dsn-slider-content [data-dsn-id="' + i + '"]'),
              l = r.find(".dsn-chars-wrapper");
            e.find(".slide-inner").attr("data-overlay", r.data("overlay")),
              n.progress(1),
              (n = new gsap.timeline()),
              n.staggerFromTo(
                s ? o.toArray().reverse() : o,
                0.3,
                this.showText(t).title,
                this.hideText(s, t).title,
                0.05,
                0,
                function () {
                  e
                    .find(".dsn-slider-content .slide-content")
                    .removeClass("dsn-active")
                    .removeClass("dsn-active-cat"),
                    r.addClass("dsn-active"),
                    r.addClass("dsn-active-cat");
                }
              ),
              n.staggerFromTo(
                s ? l.toArray().reverse() : l,
                0.8,
                this.hideText(!s, t).title,
                this.showText(t).title,
                0.05,
                "-=.1"
              );
          },
          showText: function (e) {
            let t = {
              title: { autoAlpha: 1, scale: 1, ease: "back.out(4)", yoyo: !0 },
            };
            return (t.title[e] = "0%"), t;
          },
          hideText: function (e, t) {
            let n = { title: { autoAlpha: 0, ease: "back.in(4)", yoyo: !0 } };
            return (n.title[t] = e ? "40%" : "-40%"), n;
          },
          initWebgel: async function (t) {
            let n = [],
              i = [];
            return (
              t.find(".dsn-slider-content .slide-content").each(function (t) {
                let a = e(this);
                (n[t] = a.data("webgel-src")),
                  (i[t] = a.data("overlay")),
                  a.attr("data-dsn-id", t),
                  0 === t && a.addClass("dsn-active dsn-active-cat");
                let s = a.find(".title");
                dsnGrid.convertTextLine(s), (a = s = null);
              }),
              t.find(".slide-inner").attr("data-overlay", i[0]),
              {
                imgs: n,
                overlay: i,
                displacement: dsnGrid.getData(
                  t.find(".slide-inner"),
                  "displacement",
                  "assets/img/displacement/8.jpg"
                ),
                intensity: dsnGrid.getData(
                  t.find(".slide-inner"),
                  "intensity",
                  -2
                ),
                speedIn: dsnGrid.getData(
                  t.find(".slide-inner"),
                  "speedIn",
                  1.2
                ),
                speedOut: dsnGrid.getData(
                  t.find(".slide-inner"),
                  "speedOut",
                  1.2
                ),
                easing: dsnGrid.getData(
                  t.find(".slide-inner"),
                  "easing",
                  "Expo.easeInOut"
                ),
              }
            );
          },
        };
      })().run(),
      await (e(".dsn-isotope").each((t, n) => {
        setTimeout(function () {
          e(n).masonry({
            itemSelector: dsnGrid.getData(n, "item", ".grid-item"),
            horizontalOrder: dsnGrid.getData(n, "horizontalOrder", !0),
            fitWidth: dsnGrid.getData(n, "fitWidth", !1),
          });
        }, 1e3);
      }),
      void e(".dsn-filter").each(function () {
        const t = e(this).find(".filtering .filtering "),
          n = e(this).find(".dsn-isotope");
        t.length &&
          n.length &&
          (n.isotope(),
          t.find("button").off("click"),
          t.find("button").on("click", function () {
            e(this).addClass("active").siblings().removeClass("active"),
              n.isotope({ filter: e(this).attr("data-filter") });
          }));
      })),
      await {
        swiper: function (t, n) {
          (t = dsnGrid.convertToJQuery(t)),
            (n = e.extend(
              !0,
              {
                slidesPerView: 1,
                centeredSlides: !0,
                spaceBetween: 0,
                grabCursor: !0,
                speed: 1e3,
                parallax: !0,
                loop: !0,
                autoHeight: !0,
                slideToClickedSlide: !0,
                pagination: {
                  el: t.find(".swiper-pagination").get(0),
                  clickable: !0,
                },
                navigation: {
                  nextEl: t.find(".swiper-next , .swiper-button-next").get(0),
                  prevEl: t.find(".swiper-prev , .swiper-button-prev").get(0),
                },
              },
              n
            ));
          let i = new Swiper(t.find(".swiper-container").get(0), n);
          dsnGrid.addSwiper(i);
        },
        run: function () {
          let t = this;
          e(".dsn-swiper").each(function () {
            let n = dsnGrid.getData(this, "option", {}),
              i = e(this).parent().find(dsnGrid.getData(this, "controller"));
            i.length &&
              (n.thumbs = {
                swiper: {
                  el: i.find(".swiper-container").get(0),
                  allowTouchMove: !1,

                  slidesPerView: 1,
                  speed: n.speed || 1e3,
                  parallax: !0,
                  autoHeight: !0,
                },
              }),
              (n.breakpoints = {
                768: {
                  slidesPerView:
                    n.slidesPerView >= 1
                      ? n.slidesPerView > 1.5
                        ? 2
                        : 1.3
                      : 1,
                  spaceBetween:
                    n.slidesPerView > 1
                      ? n.spaceBetween > 21
                        ? 20
                        : n.spaceBetween
                      : 0,
                },
                992: {
                  slidesPerView: n.slidesPerView,
                  spaceBetween: n.spaceBetween || 0,
                },
                575: { slidesPerView: 1, spaceBetween: 0 },
              }),
              i.length &&
                ((n.thumbs = {
                  swiper: {
                    el: i.find(".swiper-container").get(0),
                    allowTouchMove: !1,
                    slidesPerView: 1,
                    speed: n.speed || 1e3,
                    parallax: !0,
                    autoHeight: !0,
                  },
                }),
                (n.breakpoints[768] = { slidesPerView: 1, spaceBetween: 0 })),
              (n.slidesPerView = 1),
              (n.spaceBetween = 0),
              t.swiper(this, n);
          });
        },
      }.run(),
      await void e(".dsn-accordion").each(function () {
        let t = e(this),
          n = t.find(".accordion__question");
        n.on("click", function () {
          let i = e(this).next();
          t.find(".accordion__answer").not(i).slideUp(400),
            n.not(this).removeClass("expanded"),
            e(this).toggleClass("expanded"),
            i.slideToggle(400),
            (i = null);
        });
      }),
      await (function () {
        let t = e(".map-custom");
        if (!t.length) return void (t = null);
        if (!e("#map_api").length) {
            t = document.createElement("script");
          (t.type = "text/javascript"),
            (t.id = "map_api"),
            (t.src = "https://maps.googleapis.com/maps/api/js?key=" + e),
            document.body.appendChild(t),
            (e = t = null);
        }
        setTimeout(function () {
          try {
            let e = t.data("dsn-lat"),
              n = t.data("dsn-len"),
              i = t.data("dsn-zoom"),
              a = new google.maps.LatLng(e, n),
              s = new google.maps.Map(t.get(0), {
                center: { lat: e, lng: n },
                mapTypeControl: !1,
                scrollwheel: !1,
                draggable: !0,
                streetViewControl: !1,
                navigationControl: !1,
                zoom: i,
                styles: [
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
                  },
                  {
                    featureType: "landscape",
                    elementType: "geometry",
                    stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#ffffff" }, { lightness: 17 }],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [
                      { color: "#ffffff" },
                      { lightness: 29 },
                      { weight: 0.2 },
                    ],
                  },
                  {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [{ color: "#ffffff" }, { lightness: 18 }],
                  },
                  {
                    featureType: "road.local",
                    elementType: "geometry",
                    stylers: [{ color: "#ffffff" }, { lightness: 16 }],
                  },
                  {
                    featureType: "poi",
                    elementType: "geometry",
                    stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#dedede" }, { lightness: 21 }],
                  },
                  {
                    elementType: "labels.text.stroke",
                    stylers: [
                      { visibility: "on" },
                      { color: "#ffffff" },
                      { lightness: 16 },
                    ],
                  },
                  {
                    elementType: "labels.text.fill",
                    stylers: [
                      { saturation: 36 },
                      { color: "#333333" },
                      { lightness: 40 },
                    ],
                  },
                  {
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
                  },
                  {
                    featureType: "administrative",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#fefefe" }, { lightness: 20 }],
                  },
                  {
                    featureType: "administrative",
                    elementType: "geometry.stroke",
                    stylers: [
                      { color: "#fefefe" },
                      { lightness: 17 },
                      { weight: 1.2 },
                    ],
                  },
                ],
              });
            google.maps.event.addDomListener(window, "resize", function () {
              let e = s.getCenter();
              google.maps.event.trigger(s, "resize"),
                s.setCenter(e),
                (e = null);
            }),
              new google.maps.Marker({
                position: a,
                animation: google.maps.Animation.BOUNCE,
                icon: "assets/img/map-marker.png",
                title: "ASL",
                map: s,
              }),
              (e = n = i = a = null);
          } catch (e) {
            console.log(e);
          }
        }, 500);
      })(),
      await (async function () {
        const t = e(".dsn-paginate-right-page");
        if (!t.length) return;
        t.empty(),
          e(".section").each(function () {
            const n = dsnGrid.getData(this, "title"),
              i = e(this).offset().top,
              a = e(
                '<div class="dsn-link-paginate text-transform-upper"></div>'
              );
            a.html(n),
              dsnGrid.convertTextLine(a, "chars"),
              t.append(a),
              a.on("click", function () {
                dsnGrid.scrollTop(i, 1, -150);
              });
          });
      })(),
      await (function () {
        let t = {
          delegate: "a:not(.effect-ajax)",
          type: "image",
          closeOnContentClick: !1,
          closeBtnInside: !1,
          mainClass: "mfp-with-zoom",
          gallery: { enabled: !0 },
          zoom: {
            enabled: !0,
            duration: 400,
            easing: "cubic-bezier(0.36, 0, 0.66, -0.56)",
            opener: function (e) {
              return e;
            },
          },
          callbacks: {
            open: function (t) {
              e("html").css({ margin: 0 });
            },
          },
        };
        e(".gallery-portfolio:not(.dsn-stories)").each(function () {
          e(this).magnificPopup(t);
        }),
          e(".has-popup .pop-up").length && (t.delegate = "a.pop-up");
        e(".has-popup").magnificPopup(t),
          (t.zoom.opener = function (e) {
            return (
              e.parents(".dsn-stories-gallery").toggleClass("dsn-active"), e
            );
          }),
          e(".dsn-stories .dsn-stories-gallery").each(function () {
            const n = e(this).find("a").first();
            n.append("<img src='" + n.attr("href") + "' class='cover-bg-img'>"),
              e(this).magnificPopup(t),
              dsnGrid.convertTextLine(
                e(this).find(".heading-h2 , .sm-title-block , .title-block")
              );
          });
      })(),
      await void e(".gallery-portfolio").each(function () {
        e(this).justifiedGallery({
          rowHeight: dsnGrid.getData(this, "rowheight", 250),
          margins: dsnGrid.getData(this, "margins", 15),
        });
      }),
      await (function () {
        class e {
          constructor(e) {
            (this.DOM = { el: e }),
              (this.DOM.reveal = document.createElement("div")),
              (this.DOM.reveal.className = "hover-reveal"),
              (this.DOM.reveal.innerHTML = `<div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div>`),
              this.DOM.el.appendChild(this.DOM.reveal),
              (this.DOM.revealImg =
                this.DOM.reveal.querySelector(".hover-reveal__img")),
              dsnGrid.convertTextLine(
                this.DOM.el.querySelectorAll(".work__item-text")
              ),
              (this.DOM.letters = [
                ...this.DOM.el.querySelectorAll(".work__item-text span"),
              ]),
              this.initEvents();
          }
          initEvents() {
            (this.positionElement = (e) => {
              if ($body.hasClass("dsn-ajax-effect")) return;
              const t =
                ((i = 0),
                (a = 0),
                (n = e) || (n = window.event),
                n.pageX || n.pageY
                  ? ((i = n.pageX), (a = n.pageY))
                  : (n.clientX || n.clientY) &&
                    ((i =
                      n.clientX +
                      document.body.scrollLeft +
                      document.documentElement.scrollLeft),
                    (a =
                      n.clientY +
                      document.body.scrollTop +
                      document.documentElement.scrollTop)),
                { x: i, y: a });
              var n, i, a;
              if ($effectScroll.isScroller()) {
                const e = $effectScroll.getScrollbar();
                (this.DOM.reveal.style.top =
                  t.y - this.DOM.reveal.offsetHeight / 2 + e.offset.y + "px"),
                  (this.DOM.reveal.style.left =
                    t.x -
                    (this.DOM.reveal.offsetHeight / 2 - 60) -
                    e.offset.x +
                    "px");
              } else {
                const e = {
                  left:
                    document.body.scrollLeft +
                    document.documentElement.scrollLeft,
                  top:
                    document.body.scrollTop +
                    document.documentElement.scrollTop,
                };
                (this.DOM.reveal.style.top = t.y + 20 - e.top / 150 + "px"),
                  (this.DOM.reveal.style.left = t.x + 20 - e.left + "px");
              }
            }),
              (this.mouseenterFn = (e) => {
                $body.hasClass("dsn-ajax-effect") ||
                  (this.positionElement(e),
                  this.animateLetters(),
                  this.showImage());
              }),
              (this.mousemoveFn = (e) =>
                requestAnimationFrame(() => {
                  $body.hasClass("dsn-ajax-effect") || this.positionElement(e);
                })),
              (this.mouseleaveFn = () => {
                $body.hasClass("dsn-ajax-effect") || this.hideImage();
              }),
              this.DOM.el.addEventListener("mouseenter", this.mouseenterFn),
              this.DOM.el.addEventListener("mousemove", this.mousemoveFn),
              this.DOM.el.addEventListener("mouseleave", this.mouseleaveFn);
          }
          showImage() {
            TweenMax.killTweensOf(this.DOM.revealImg),
              (this.tl = new TimelineMax({
                onStart: () => {
                  (this.DOM.reveal.style.opacity = 1),
                    TweenMax.set(this.DOM.el, { zIndex: 1e3 });
                },
              })
                .add("begin")
                .set(this.DOM.revealImg, {
                  transformOrigin: "95% 50%",
                  x: "100%",
                })
                .add(
                  new TweenMax(this.DOM.revealImg, 0.2, {
                    ease: Sine.easeOut,
                    startAt: { scaleX: 0.5, scaleY: 1 },
                    scaleX: 1.5,
                    scaleY: 0.7,
                  }),
                  "begin"
                )
                .add(
                  new TweenMax(this.DOM.revealImg, 0.8, {
                    ease: Expo.easeOut,
                    startAt: { rotation: 10, y: "5%", opacity: 0 },
                    rotation: 0,
                    y: "0%",
                    opacity: 1,
                  }),
                  "begin"
                )
                .set(this.DOM.revealImg, { transformOrigin: "0% 50%" })
                .add(
                  new TweenMax(this.DOM.revealImg, 0.6, {
                    ease: Expo.easeOut,
                    scaleX: 1,
                    scaleY: 1,
                    opacity: 1,
                  }),
                  "begin+=0.2"
                )
                .add(
                  new TweenMax(this.DOM.revealImg, 0.6, {
                    ease: Expo.easeOut,
                    x: "0%",
                  }),
                  "begin+=0.2"
                ));
          }
          hideImage() {
            TweenMax.killTweensOf(this.DOM.revealImg),
              (this.tl = new TimelineMax({
                onStart: () => {
                  TweenMax.set(this.DOM.el, { zIndex: 999 });
                },
                onComplete: () => {
                  TweenMax.set(this.DOM.el, { zIndex: "" }),
                    TweenMax.set(this.DOM.reveal, { opacity: 0 });
                },
              })
                .add("begin")
                .add(
                  new TweenMax(this.DOM.revealImg, 0.2, {
                    ease: Sine.easeOut,
                    opacity: 0,
                    x: "-20%",
                  }),
                  "begin"
                ));
          }
          animateLetters() {
            TweenMax.killTweensOf(this.DOM.letters),
              this.DOM.letters.forEach((e) =>
                TweenMax.set(e, {
                  y: 0 === Math.round(Math.random()) ? "50%" : "0%",
                  opacity: 0,
                })
              ),
              TweenMax.to(this.DOM.letters, 1, {
                ease: Expo.easeOut,
                y: "0%",
                opacity: 1,
              });
          }
        }
        Array.from(
          document.querySelectorAll(
            '[data-fx="1"] > .work__item a, a[data-fx="1"]'
          )
        ).forEach((t) => new e(t));
      })(),
      await (function () {
        const t = e("#contact-form");
        if (t < 1) return;
        t.validator(),
          t.on("submit", function (n) {
            if (!n.isDefaultPrevented())
              return (
                e.ajax({
                  type: "POST",
                  url: "contact.php",
                  data: e(this).serialize(),
                  success: function (e) {
                    var n = "alert-" + e.type,
                      i = e.message,
                      a =
                        '<div class="alert ' +
                        n +
                        ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                        i +
                        "</div>";
                    n && i && (t.find(".messages").html(a), t[0].reset()),
                      setTimeout(function () {
                        t.find(".messages").html("");
                      }, 3e3);
                  },
                  error: function (e) {
                    console.log(e);
                  },
                }),
                !1
              );
          });
      })(),
      await e(".ah-headline").animatedHeadline(),
      await n().ajaxLoad(),
      await (e('a[href="#"]').on("click", function (e) {}),
      e('[href*="#"]:not([href="#"])').on("click", function (t) {}),
      void (
        window.location.hash.length &&
        ($wind.scrollTop(0), dsnGrid.scrollTop(window.location.hash, 1, -100))
      ));
  }
  function n() {
    var n,
      i,
      a = gsap.timeline();
    return {
      ajaxLoad: function () {
        if (!$body.hasClass("dsn-ajax")) return;
        let t = this;
        this.ajaxClick.off("click"),
          this.ajaxClick.on("click", function (n) {
            n.preventDefault();
            let i = e(this),
              s = i.attr("href"),
              o = i.data("dsn-ajax");
            s.indexOf("#") >= 0 || void 0 === s
              ? (i = s = o = null)
              : t.effectAjax() ||
                (t.effectAjax(!0),
                e.ajax({
                  url: s,
                  dataType: "html",
                  beforeSend: t.animateAjaxStart.bind(t, o, i),
                  success: function (e) {
                    try {
                      history.pushState(null, "", s),
                        a.call(
                          t.animateAjaxEnd.bind(t, e),
                          null,
                          null,
                          "+=0.2"
                        );
                    } catch (e) {
                      window.location = s;
                    }
                  },
                  error: function (e) {
                    window.location = s;
                  },
                }));
          });
      },
      mainRoot: e("main.main-root"),
      ajaxClick: e("a.effect-ajax "),
      effectAjax: function (t) {
        if (t) e("html").addClass("dsn-ajax-effect");
        else {
          if (!1 !== t) return e("html").hasClass("dsn-ajax-effect");
          e("html").removeClass("dsn-ajax-effect");
        }
      },
      animateAjaxStart: function (e, t) {
        switch ((a.clear(), a.addLabel("beforeSend"), e)) {
          case "slider":
            this.ajaxSlider(t);
            break;
          case "next":
            this.ajaxNextProject(t);
            break;
          case "work":
            this.ajaxWork(t);
            break;
          case "work-hover":
            this.ajaxWorkHover(t);
            break;
          default:
            this.ajaxNormal();
        }
      },
      ajaxNormal: function () {
        let t = e('<div class="dsn-ajax-loader dsn-ajax-normal"></div>');
        $body.append(t),
          a.to(t, 1, { autoAlpha: 1, ease: Expo.easeOut }, 0),
          (t = null);
      },
      ajaxSlider: function (t) {
        let n = t.parents(".slide-content"),
          i = n.data("dsn-id"),
          a = n
            .parents(".main-slider")
            .find('.swiper-slide[data-dsn-id="' + i + '"] .image-bg')
            .first(),
          s = n.find(".title");
        if (n.data("webgel-src") && dsnGrid.isMobile())
          return void this.ajaxNormal();
        let o = n.parents(".main-slider").find(".bg-container");
        n.data("webgel-src") &&
          (a = e("<div class='cover-bg'></div>").attr({
            "data-overlay": o.find(".dsn-webgl").data("overlay"),
            style: 'background-image:url("' + n.data("webgel-src") + '")',
          })),
          this.dsnCreateElement(a, o, s, s, {
            after: function (e) {
              e.find("video").length &&
                (e.find("img").removeClass("hidden"), e.find("video").remove());
            },
          });
      },
      ajaxNextProject: function (e) {
        let t = e.parents(".next-project"),
          n = t.find(".bg-container"),
          i = e.find(".title");
        this.dsnCreateElement(n, t, i, e, {
          before: function (e, t, i) {
            n.css({
              transition: "clip-path 1s",
              clipPath: "circle(100% at 70% 39.9839%)",
            }),
              t.css({
                transition: "clip-path 1s",
                clipPath: "circle(100% at 70% 39.9839%)",
              });
          },
        }),
          (t = n = i = null);
      },
      ajaxWork: function (e) {
        let t = e.parents(".work-item"),
          i = t.find(".img-next-box"),
          s = t.find(".sec-title");
        this.dsnCreateElement(i, i, s, s),
          a.to(n.find("img"), 0.5, { height: "100%", top: "0%", y: "0" }),
          (t = i = s = null);
      },
      ajaxWorkHover: function (e) {
        let t = e,
          n = t.find(".hover-reveal"),
          i = t.find(".work__item-text");
        this.dsnCreateElement(n.find(".hover-reveal__img"), n, i, i),
          (t = n = i = null);
      },
      addElement: function (e, t, n) {
        if (void 0 === t || t.length <= 0) return;
        (void 0 === n || n.length <= 0) && (n = t),
          t.removeClass("line-after").removeClass("line-before");
        let i = t.clone(),
          a = n[0].getBoundingClientRect();
        return (
          void 0 === a && (a = { left: 0, top: 0 }),
          i.css({
            position: "fix",
            display: "block",
            transform: "",
            transition: "",
            objectFit: "cover",
          }),
          i.css(dsnGrid.getBoundingClientRect(n[0])),
          i.css(t.dsnGridStyleObject()),
          e.append(i),
          i
        );
      },
      dsnCreateElement: function (t, s, o, r, l = {}) {
        let d = e('<div class="dsn-ajax-loader"></div>');
        (n = this.addElement(d, t, s)),
          (i = this.addElement(d, o, r)).find(".dsn-chars-wrapper").length ||
            dsnGrid.convertTextLine(i),
          void 0 !== l.before && l.before(d, n, i),
          $body.append(d),
          a.to(d, 1, { autoAlpha: 1, ease: Power4.easeInOut }, "-=0.8"),
          void 0 !== l.after && l.after(d, n, i);
      },
      completeElement: function (t) {
        let s = e('[data-dsn-ajax="img"]'),
          o = e('[data-dsn-ajax="title"]');
        if (!s.length && !o.length) {
          let e = { value: "0%" };
          return void a.to(e, 1, {
            value: "100%",
            onUpdate: function () {
              t.css("clip-path", "inset(0% 0% " + e.value + " 0%)");
            },
            onComplete: function () {
              e = null;
            },
            ease: Circ.easeIn,
          });
        }
        s = s.first();
        let r = {
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transform: "none",
        };
        if (i.length) {
          (o = o.first()),
            o.find(".dsn-chars-wrapper").length || dsnGrid.convertTextLine(o),
            (r = o.offset()),
            void 0 === r && (r = { top: 0, left: 0 }),
            a.set(
              i.find(".dsn-chars-wrapper"),
              { x: i.offset().left - r.left, y: i.offset().top - r.top },
              "-=1"
            );
          let e = i.find(".dsn-chars-wrapper").toArray();
          i.offset().left < r.left && e.reverse(),
            a.set(i, { top: r.top, left: r.left }, "-=0.8"),
            a.to(i, 0.4, { padding: "0", borderWidth: 0, yoyo: !0 }),
            a.to(i, 0.8, { css: o.dsnGridStyleObject(), yoyo: !0 }, "-=0.8"),
            i.css("width", o.outerWidth()),
            a.set(e, { color: i.css("color") }),
            a.staggerTo(
              e,
              0.8,
              {
                y: "0",
                x: "0",
                ease: Back.easeOut.config(1),
                color: o.css("color"),
                yoyo: !0,
              },
              0.02,
              "-=0.35"
            );
        }
        s.length &&
          (r = {
            top: s.get(0).offsetTop,
            left: s.get(0).offsetLeft,
            width: s.width(),
            height: s.height(),
          }),
          n.length &&
            a.to(
              n,
              {
                duration: 1,
                top: r.top,
                left: r.left,
                width: r.width,
                height: r.height,
                objectFit: "cover",
                borderRadius: 0,
                ease: Expo.easeIn,
              },
              "-=1.4"
            );
        let l = { value: "0%" };
        a.to(l, 0.5, {
          value: "100%",
          onUpdate: function () {
            t.css("clip-path", "inset(0% 0% " + l.value + " 0%)");
          },
          onComplete: function () {
            l = null;
          },
          ease: Circ.easeIn,
        });
      },
      animateAjaxEnd: function (n) {
        a.call(
          function () {
            dsnGrid.initAjax(n),
              this.mainRoot.html(e(n).filter("main.main-root").html()),
              t(!0).catch((e) => {
                console.error(e);
              });
          }.bind(this),
          null,
          "+=1"
        );
        let i = e(".dsn-ajax-loader");
        i.hasClass("dsn-ajax-normal")
          ? a.to(i, 1, { autoAlpha: 0, ease: Expo.easeIn })
          : a.call(this.completeElement.bind(this, i)),
          a.eventCallback(
            "onComplete",
            function () {
              i.remove(), this.effectAjax(!1);
            }.bind(this)
          );
      },
      backAnimate: function (t) {
        if (!t) return;
        let n = this;
        e.ajax({
          url: t,
          dataType: "html",
          beforeSend: n.animateAjaxStart.bind(n),
          success: function (e) {
            a.call(n.animateAjaxEnd.bind(n, e), null, null, "+=0.2");
          },
          error: function (e) {
            window.location = t;
          },
        });
      },
    };
  }
  function i() {
    $wind.on("popstate", function (e) {
      if (window.location.hash.length)
        return (
          $wind.scrollTop(0),
          void dsnGrid.scrollTop(window.location.hash, 1, -100)
        );
      document.location.href.indexOf("#") > -1 ||
        setTimeout(function () {
          n().backAnimate(document.location);
        }, 100);
    });
  }
  function a(t) {
    setTimeout(function () {
      e("[data-dsn-" + t + "]").each(function () {
        "bg" === t
          ? e(this).css(
              "background-image",
              `url(${dsnGrid.getData(this, t, "")})`
            )
          : e(this).attr(t, dsnGrid.getData(this, t, ""));
      });
    }, 100);
  }
  async function s(t) {
    const n = e(".cursor");
    if (!dsnGrid.isMobile() && $body.hasClass("dsn-cursor-effect")) {
      if (!0 === t) return n.attr("class", "cursor"), void i();
      dsnGrid.mouseMove(n, { speed: 0.5 }), i();
    } else
      n.length &&
        (n.css("display", "none"), $body.removeClass("dsn-cursor-effect"));
    function i() {
      dsnGrid.elementHover(
        n,
        "a:not(> img):not(.vid) , .dsn-button-sidebar,  button , .mfp-container",
        "cursor-scale-full"
      ),
        dsnGrid.elementHover(n, ".c-hidden , .social-side a", "no-scale"),
        dsnGrid.elementHover(
          n,
          ".has-popup a , .work-item-box a:not(.effect-ajax)",
          "cursor-scale-half cursor-open"
        ),
        dsnGrid.elementHover(
          n,
          '[data-cursor="close"]',
          "cursor-scale-full cursor-close"
        ),
        dsnGrid.elementHover(n, "a.link-pop ", "cursor-scale-full cursor-view");
    }
  }
  !(function () {
    let n = e(".preloader"),
      a = n.find(".percent"),
      s = n.find(".title .text-fill"),
      o = { value: 0 },
      r = n.find(".preloader-bar"),
      l = r.find(".preloader-progress"),
      d = dsnGrid.pageLoad(0, 100, 1e3, function (e) {
        a.text(e),
          (o.value = e),
          s.css("clip-path", "inset(" + (100 - e) + "% 0% 0% 0%)"),
          l.css("width", e + "%");
      });
    n.length ||
      (i(),
      t().catch((e) => {
        console.log(e);
      }));
    $wind.on("load", function () {
      clearInterval(d),
        gsap
          .timeline()
          .to(o, 1, {
            value: 100,
            onUpdate: function () {
              a.text(o.value.toFixed(0)),
                s.css("clip-path", "inset(" + (100 - o.value) + "% 0% 0% 0%)"),
                l.css("width", o.value + "%");
            },
          })
          .to(n.find("> *:not(.preloader-bar)"), { y: -30, autoAlpha: 0 })
          .call(function () {
            n.length &&
              (i(),
              t().catch((e) => {
                console.log(e);
              }));
          })
          .set(o, { value: 0 })
          .to(
            o,
            0.8,
            {
              value: 100,
              onUpdate: function () {
                n.css("clip-path", "inset(0% 0%" + o.value + "%   0%)");
              },
              ease: Power2.easeInOut,
            },
            "+=0.5"
          )
          .call(function () {
            n.remove(), (d = n = a = s = o = r = l = null);
          });
    });
  })(),
    s(),
    dsnGrid.executeStyle();
})(jQuery);