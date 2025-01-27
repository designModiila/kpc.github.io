

$(function() {
  var aniBox = $('.ani');
  $('#fullpage').fullpage({
    navigation: false,
    verticalCentered: true,
    //autoScrolling: true,
    scrollingSpeed:1000,
    css3:true,
    scrollOverflow: true,
    responsiveWidth: 767,
    onLeave: function(anchorLink, index, direction) {
      $.fn.fullpage.setAllowScrolling(true);
      if(index == 1){
        $('#header').removeClass('__w');
        $('.btn_top').css('opacity','0');
      }else if(index == 2){
        $('#header').removeClass('__w');
        $('.btn_top').css('opacity','1');
      }else if (index == 3) {
        $('#header').addClass('__w')
        $('.scrolldown-box').css('opacity','0')
        $.fn.fullpage.setAllowScrolling(false);
				$('.section03 .content').scroll(function() {
					var scrollBox = $(this);
					var scrT = $(scrollBox).scrollTop();
					var scrH = $('.section03 .content .leftSec').height();
					var scrB = scrH - $(window).height();
					
					if (scrT < scrB) {
					} else {
						//$.fn.fullpage.setAllowScrolling(true);
						console.log('끝');
					}
					if (scrT == 0) {
						//$.fn.fullpage.setAllowScrolling(true);
						console.log('처음')
					}
				});
				$('.section03 .content').on('wheel', function(e) {
					var scrollBox = $(this);
					var scrZ = 0;
					var scrT = $(scrollBox).scrollTop();
					//var scrH = $('.section03 .flow-box-wrap').height();
          var scrH = $('.section03 .content .leftSec').height();
					var scrB = scrH - $(window).height();
					var wheelDelta = e.originalEvent.deltaY;
					/*if (scrT == scrB) {
						$.fn.fullpage.setAllowScrolling(true);
					}*/
					if (wheelDelta > -50) {
						if (scrT < scrB) {
							// Scroll down
						} else {
							$.fn.fullpage.setAllowScrolling(true);
							console.log('down');
						}
					} else {
						if (scrT > 0) {
							// Scroll up
						} else {
							$.fn.fullpage.setAllowScrolling(true);
							console.log('up');
						}
					}
				});
      }
      else if(index == 4){
        $('#header').removeClass('__w')
        $('.scrolldown-box').css('opacity','1')
      }else{
        $('#header').addClass('__w')
        $('.scrolldown-box').css('opacity','0')
      }

    },
    afterLoad: function (anchorLink, index, direction) {
      setTimeout(function () {
        $('.fp-table.active').addClass('loaded');
      }, 2500);
			if (index != 0) {
				$(this).find(aniBox).addClass('on');
			}
    },


  });

  $('.btn_top').click(function() {
		$.fn.fullpage.moveTo(1, 1); // 이동하고싶은 페이지
	});


  var chkSectionHeight = function chkSectionHeight() {
    var $target = $('.main .section');
    var winHeight = $(window).height();
    $target.height(winHeight);
  };

  chkSectionHeight();
  $(window).on('resize', function () {
    chkSectionHeight();
  });

  var chkScrollPages = function chkScrollPages() {
    var $fullpage = $('#fullpage');
    var scrollTop = $(window).scrollTop();
    var $target = $fullpage.find('.section');
    var $body = $('body');
    var currentNum = 0;
    $target.each(function (idx, item) {
      // console.log(idx, item);
      var $target = $(item);
      var targetOffsetTop = $target.offset().top;
      $body.removeClass("fp-viewing-".concat(idx));

      if (scrollTop >= targetOffsetTop) {
        $target.addClass('loaded');
        currentNum = idx;
      }
    });
    $body.addClass("fp-viewing-".concat(currentNum));
  };

  chkScrollPages();
  $(window).on('scroll', function (e) {
    chkScrollPages();
  });



});

$(function() {
  $(window).scroll(function(){
    if( $(this).scrollTop() > 1000 ){
      $(".btn_top").addClass("on");
    }
    else{
      $(".btn_top").removeClass("on");
    }
  });
  $(".btn_top").click(function(){
    window.scrollTo({top : 0, behavior: 'smooth'}); 
  });

  if (!$('body').hasClass('subPage')) {
    // const scrollTop = document.querySelector('.btn_top')
    // window.addEventListener('scroll', function(){
    //   if(this.window.scrollY > 1000){
    //     gsap.to(scrollTop, .2,{
    //       opacity : 1
    //     })
    //   }else {
    //     gsap.to(scrollTop, .2,{
    //       opacity : 0
    //     })
    //   }
    // }, 300)
    // scrollTop.addEventListener('click', function(){
    //   gsap.to(window, .7,{
    //     scrollTo: 0
    //   })
    // })


    var interleaveOffset = 0.5;
    var numSwiper = new Swiper("#textVisual", {
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      //autoplay : false,
      pagination: {
        el: '#textVisual .pagination-text',
        clickable: true,
      }
    });

    var bgSwiper = new Swiper("#mainVisual", {
      loop: true,
      parallax: true,
      pagination: {
        el: '#mainVisual .pagination-num',
        type: 'fraction',
        formatFractionCurrent: function (number) {
          return ('0' + number).slice(-2);
        },
        formatFractionTotal: function (number) {
          return ('0' + number).slice(-2);
        },
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + '<span class="' + totalClass + '"></span>';
        },
      },
      navigation: {
        nextEl: "#mainVisual .swiper-button-next",
        prevEl: "#mainVisual .swiper-button-prev"
      },
      on: {
        init: function () {
          $(".swiper-progress-bar").removeClass("animate");
          $(".swiper-progress-bar").removeClass("active");
          $(".swiper-progress-bar").eq(0).addClass("animate");
          $(".swiper-progress-bar").eq(0).addClass("active");
        },
        slideChangeTransitionStart: function () {
          $(".swiper-progress-bar").removeClass("animate");
          $(".swiper-progress-bar").removeClass("active");
          $(".swiper-progress-bar").eq(0).addClass("active");
        },
        slideChangeTransitionEnd: function () {
          $(".swiper-progress-bar").eq(0).addClass("animate");
        },
        progress: function () {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            var slideProgress = swiper.slides[i].progress;
            var innerOffset = swiper.width * interleaveOffset;
            var innerTranslate = slideProgress * innerOffset;
            swiper.slides[i].querySelector(".video-wrap").style.transform =
              "translate3d(" + innerTranslate + "px, 0, 0)";
          }
        },

        touchStart: function () {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = "";
          }
        },

        setTransition: function (speed) {
          var swiper = this;
          for (var i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + "ms";
            swiper.slides[i].querySelector(".video-wrap").style.transition =
              speed + "ms";
          }
        }
      }
    });

    numSwiper.controller.control = bgSwiper;
    bgSwiper.controller.control = numSwiper;

    $(window).scroll(function(){
    
      if( $(this).scrollTop() > 100 ){
        $(".btn_top").addClass("on");
      }
      else{
        $(".btn_top").removeClass("on");
      }
      
    });
      
    $(".btn_top").click(function(){
      window.scrollTo({top : 0, behavior: 'smooth'}); 
    });
  }
  


  gsap.registerPlugin(ScrollTrigger);

  function initializeContDAnimation() {
    const contD = document.querySelectorAll(".contD");
    gsap.set(".contD > div", { y: "25%", opacity: 0 });
    contD.forEach((contD) => {
      const blockTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: contD,
          start: "top 70%",
          toggleActions: "restart none none reverse",
        },
      }).to(contD.querySelectorAll(".contD > div"), {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.3,
      });
    });
  }


  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      // const elmHeight = document.querySelectorAll('.flow-box-wrap').offsetHeight;
      // gsap.to(".leftSec", {
      //   scrollTrigger: {
      //     trigger: ".flow-box-wrap",
      //     scrub: true,
      //     pin: ".main .section03 .flow-box-wrap",
      //     start: 'top top',
      //     //end: elmHeight + "bottom",
      //     end: `+=${window.innerHeight * 1}`,
      //     //end: 'bottom center',
      //     //markers: true,
      //   },
      //   yPercent: -125,
      //   ease: 'none',
      // })


      _startPosition = window.innerHeight + 0 + "px";
      var $subVisual = document.querySelector('.subVisual')
      gsap.timeline({
        scrollTrigger: {
          trigger: $subVisual,
          start: "top+=" + _startPosition + " 99.9%",
          end: "top+=200% bottom",
          pin: true,
          onEnter: function () {
            $(".subVisual .image-wrap").addClass("on");
            $('.subVisual .title-wrap').addClass('on');
          },
          onLeaveBack: function () {
            $(".subVisual .image-wrap").removeClass("on");
            $('.subVisual .title-wrap').removeClass('on');
          },
          onEnterBack: function () {
            $(".subVisual .image-wrap").addClass("on");
            $('.subVisual .title-wrap').addClass('on');
          },
        }
      });
      gsap.from(".subVisual .title > p",{autoAlpha: 0, y: '25%', duration: 0.3, stagger: 0.3, delay: 0.1, ease: "power1.inOut"})


      // var businessDiagram = gsap.timeline({
      //   scrollTrigger:{
      //     trigger:".business02 .section01",
      //     start:"top 10%",
      //     pin: true,
      //     // scrub: 3,
      //     // end: "bottom +30%"
      //     //end: "+=2500",
      //     //toggleActions:"restart none none reset"
      //   }
      // })
      // .from(".circle",{autoAlpha: 0, stagger: 0.2})
      // .from(".diagram-bg",{autoAlpha: 0})

      function businessModal(){
        $('#layer-dimm').hide();
        $('.businessModal.modal').hide();
    
        $('.precursorModalBtn').click(function(){
          $('#layer-dimm').show();
          $('#precursorModal').show();
          $('body').addClass('noScroll')
        })

        $('.recycleModalBtn').click(function(){
          $('#layer-dimm').show();
          $('#recycleModal').show();
          $('body').addClass('noScroll')
        })
    

        $('.modal-close').click(function(){
          $('#layer-dimm').hide();
          $('.businessModal.modal').hide();
          $('body').removeClass('noScroll')
        })

        // var businessModal = document.getElementsByClassName('businessModal')
        // var modalGif = businessModal.getElementsByTagName('img')[0];
        // var modalSrc = modalGif.src;
    
        // modalGif.setAttribute('src', '');
        // setTimeout(function () {
        //   modalGif.setAttribute('src', modalSrc);
        // }, 0);
      }
    
      businessModal();


      var diagramAni2 = gsap.timeline({
        scrollTrigger:{
          trigger:".esg01 .section01",
          start:"top 10%",
          pin: true,
          scrub: 3,
          end: "bottom +30%"
          //end: "+=2500",
          //toggleActions:"restart none none reset"
        }
      })
      // .from(".esg01 .circle-wrap",{autoAlpha:0, duration: 1, ease: Power4.easeOut})
      // .from(".esg01 .circle",{autoAlpha: 0, yPercent: -25, duration: 1, ease: Power4.easeOut, stagger: 0.3 })
      .to(".esg01 .circle-side",{left: "50%",transform:"translate(-50%, -50%)", duration: 1, ease: Power4.easeOut})
      .to(".esg01 .last-circle",{autoAlpha: 1})
      .to(".esg01 .circle",{autoAlpha: 0})


      var diagramAni3 = gsap.timeline({
        scrollTrigger:{
          trigger:".esg02 .section01",
          start:"top 10%",
          pin: true,
          scrub: 3,
          end: "bottom +30%"
          //end: "+=2500",
          //toggleActions:"restart none none reset"
        }
      })
      // .from(".esg02 .circle-wrap",{autoAlpha:0, duration: 0.3, ease: Power4.easeOut})
      // .from(".esg02 .circle",{autoAlpha: 0, yPercent: -25, duration: 0.3, ease: Power4.easeOut, stagger: 0.3 })
      .to(".esg02 .circle-side",{left: "50%",transform:"translate(-50%, -50%)", duration: 1, ease: Power4.easeOut})
      .to(".esg02 .last-circle",{autoAlpha: 1, duration: 1})
      .to(".esg02 .circle",{autoAlpha: 0, duration: 1})

      initializeContDAnimation()

      // const contD = document.querySelectorAll(".contD");
      // gsap.set(".contD > div",{y: "25%", opacity: 0})
      // contD.forEach(contD => {
      //   const blockTimeline = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: contD,
      //       start:"top 70%",
      //       toggleActions:"restart none none reverse"
      //     }
      //   })
      //   .to(contD.querySelectorAll(".contD > div"), {
      //     autoAlpha:1, 
      //     y: 0, 
      //     duration: 0.5, 
      //     stagger: 0.3
      //   })

      // });

      if ($('body').hasClass('subPage')) {
        gsap.set(".footer-inner", { yPercent: -50 });
        const uncover = gsap.timeline({ paused: true });
        uncover.to(".footer-inner", { yPercent: 0, ease: "none" });
        ScrollTrigger.create({
          trigger: ".lastSec",
          start: "bottom +=98%",
          end: "+=30%",
          animation: uncover,
          scrub: true,
          //markers: true
        });
        ScrollTrigger.refresh();
      }


    },
    "(max-width: 767px)": function () {

      function businessModal(){
        $('#layer-dimm').hide();
        $('.businessModal.modal').hide();
    
        $('.precursorModalBtn').click(function(){
          $('#layer-dimm').show();
          $('#precursorModal').show();
          $('body').addClass('noScroll')
        })

        $('.recycleModalBtn').click(function(){
          $('#layer-dimm').show();
          $('#recycleModal').show();
          $('body').addClass('noScroll')
        })
    

        $('.modal-close').click(function(){
          $('#layer-dimm').hide();
          $('.businessModal.modal').hide();
          $('body').removeClass('noScroll')
        })

        // var businessModal = document.getElementsByClassName('businessModal')
        // var modalGif = businessModal.getElementsByTagName('img')[0];
        // var modalSrc = modalGif.src;
    
        // modalGif.setAttribute('src', '');
        // setTimeout(function () {
        //   modalGif.setAttribute('src', modalSrc);
        // }, 0);
      }
    
      businessModal();


      const contD = gsap.utils.toArray('.contD')
      gsap.set(contD,{y: '25%', opacity: 0})
      contD.forEach(contD => {
        gsap.to(contD,{
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.3,
          scrollTrigger: {
            trigger: contD,
            start: 'top 70%',
            toggleActions:"restart none none reverse"
          }
        })
      })
      
    }
  });






  var newsSwiper = new Swiper(".newsSwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay:  false,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // observer: true,
    // observeParents: true,
  });

  function addActive(){
    $('.activeCon').click(function(){
      event.preventDefault();
      $('.activeCon').removeClass('active')
      $(this).addClass('active');
    })
  }
  addActive();

  function modalView(){
    $('.board li').click(function(){
      $('.layer-dimm').addClass('open');
      $('.board-view').show().addClass('open');
      $('.board-view .modal').show();
      $('body').addClass('noScroll');
    })
    $('.privacy').click(function(){
      $('.layer-dimm').addClass('open');
      $('.privacy-policy').show().addClass('open');
      $('.privacy-policy .modal').show();
      $('body').addClass('noScroll');
    })
  }
  modalView();


  function customerVoiceWrite(){
    $('.type-list li').click(function(){
      $('.layer-dimm').addClass('open');
      $('.customer-voice-write').show().addClass('open');
      $('.customer-voice-write .modal').show();
      $('body').addClass('noScroll');
    })
    $('.privacy').click(function(){
      $('.layer-dimm').addClass('open');
      $('.privacy-policy').show().addClass('open');
      $('.privacy-policy .modal').show();
      $('body').addClass('noScroll');
    })
  }
  customerVoiceWrite();
  //voc 개인정보처리방침
  $('.privacy-agree-box .btn-toggle').click(function(){
    $(this).toggleClass('on');
    $('.privacy-agree').toggleClass('on');
  });

  $(window).on('resize', function () {
    windW = $(window).width();
    var _bgSelector = $('.txt-motion');
    if (_bgSelector.length > 0) {
        var _visualBg = _bgSelector.data('bg');
        _bgSelector.css({ "background-image": "url(" + _visualBg + ")" });
    }
  })
  $(window).on('resize', function () {
    windW = $(window).width();
    var _bgSelector = $('.txt-motion');
    if (_bgSelector.length > 0) {
        var _visualBg = _bgSelector.data('bg');
        _bgSelector.css({ "background-image": "url(" + _visualBg + ")" });
    }
  })


    $('.tabcontent > div').hide();
    $('.tabnav a').click(function () {
      $('.tabcontent > div').hide().filter(this.hash).fadeIn();
      $('.tabnav a').removeClass('active');
      $(this).addClass('active');
      
      // 탭을 클릭할 때마다 contD 애니메이션 초기화 및 실행
      initializeContDAnimation();
      
      return false;
    }).filter(':eq(0)').click();
  
    
    initializeContDAnimation();
    



    // var $swiperSelector = $('.project-slide');
    // $swiperSelector.each(function(index) {
    //   var $this = $(this);
    //   $this.addClass('swiper-slider-' + index);
      
    //   // var dragSize = $this.data('drag-size') ? $this.data('drag-size') : 99;
    //   var freeMode = $this.data('free-mode') ? $this.data('free-mode') : false;
    //   var loop = $this.data('loop') ? $this.data('loop') : false;
    //   var slidesDesktop = $this.data('slides-desktop') ? $this.data('slides-desktop') : 1;
    //   var slidesTablet = $this.data('slides-tablet') ? $this.data('slides-tablet') : 1;
    //   var slidesMobile = $this.data('slides-mobile') ? $this.data('slides-mobile') : 1;
    //   var spaceBetween = $this.data('space-between') ? $this.data('space-between'): 20;
  
    //   var swiper = new Swiper('.swiper-slider-' + index, {
    //     direction: 'horizontal',
    //     loop: loop,
    //     speed: 500,
    //     autoplay: false,
    //     // autoplay: {
    //     //   delay: 5000,
    //     //   disableOnInteraction: false
    //     // },
    //     freeMode: freeMode,
    //     spaceBetween: spaceBetween,
    //     breakpoints: {
    //       1920: {
    //         slidesPerView: slidesDesktop
    //       },
    //       1085: {
    //         slidesPerView: slidesTablet
    //       },
    //       768: {
    //         slidesPerView: slidesMobile
    //       }
    //     },
    //     pagination: {
    //       el: '.swiper-pagination',
    //       type: 'fraction',
    //       formatFractionCurrent: function (number) {
    //           return + number;
    //       }
    //     },
    //     navigation: {
    //       nextEl: '.swiper-button-next',
    //       prevEl: '.swiper-button-prev'
    //     },
    //     scrollbar: {
    //       el: '.swiper-scrollbar',
    //       draggable: true,
    //       // dragSize: dragSize
    //     },
  
    //   });
    // });

    



    function esg01Timeline() {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".esg01-timeline",
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        },
      });
  
      tl.to(".esg01-timeline", {duration: 1, delay: 0.5})
        .to(".esg01-timeline .sec01", {duration: 1, opacity: 1}, "myLabel-=1")
        .to(".esg01-timeline .sec01 .img", {duration: 1}, "myLabel-=1")
        .to(".esg01-timeline .sec01 .sub-txt", {duration: 1, top: "30%", y: "-50%"}, "myLabel-=1")
        .to(".esg01-timeline .sec02", {duration: 1, opacity: 1}, "myLabel")
        .to(".esg01-timeline .sec01 .sub-txt", {duration: 1, top: "0", y: "-100%"}, "myLabel")
        .to(".esg01-timeline .sec02 .img", {duration: 1, scale: 1, transformOrigin: "50% 0%"}, "myLabel")
        .to(".esg01-timeline .sec02 .sub-txt", {duration: 1, top: "30%", y: "-50%"}, "myLabel")
        
        .to(".esg01-timeline .sec03", {duration: 1, opacity: 1}, "myLabel+=1")
        .to(".esg01-timeline .sec02 .sub-txt", {duration: 1, top: "0", y: "-100%"}, "myLabel+=1")
        .to(".esg01-timeline .sec03 .img", {duration: 1, scale: 1, transformOrigin: "50% 0%"}, "myLabel+=1")
        .to(".esg01-timeline .sec03 .sub-txt", {duration: 1, top: "30%", y: "-50%"}, "myLabel+=1")
  
      return tl;
    }

    var overviewTl = gsap.timeline();
  overviewTl.add(esg01Timeline(), "+=1");

  function layer_open(no) {
    var layer = $(".world-layer[layer=" + no + "]");
    if (!layer.hasClass("open")) {
      layer.addClass("open").show();
      $(".layer-dimm").addClass("open");
      $('body').addClass('noScroll');
    }
  };
  
  function triggerLayerEvent(layerNo) {
    $(".world-layer").removeClass("open").hide();
    var layerElement = $(".company04 .btn_layer[layer='" + layerNo + "'], .company04 .article[layer='" + layerNo + "']").first();
    layerElement.trigger('click');
  }
  
  var maxLayer = $(".world-layer").length;
  
  $(".prev.layer-btn").click(function() {
    var currentLayer = parseInt($(".world-layer.open").attr("layer"));
    var prevLayer = currentLayer - 1;
    if (prevLayer < 1) {
      prevLayer = maxLayer; 
    }
    triggerLayerEvent(prevLayer);
  });
  
  $(".next.layer-btn").click(function() {
    var currentLayer = parseInt($(".world-layer.open").attr("layer"));
    var nextLayer = currentLayer + 1;
    if (nextLayer > maxLayer) {
      nextLayer = 1; 
    }
    triggerLayerEvent(nextLayer);
  });
  
  $(".company04 .btn_layer, .company04 .article").hover(
    function() { 
      var layerNo = $(this).attr("layer");  
     
      $(".company04 .btn_layer[layer='" + layerNo + "']").closest('.tablinks').addClass('hover');      
      $(".company04 .article[layer='" + layerNo + "']").addClass('hover');
    }, 
    function() { // 마우스가 요소에서 벗어났을 때
      var layerNo = $(this).attr("layer");
      $(".company04 .btn_layer[layer='" + layerNo + "']").closest('.tablinks').removeClass('hover');
      $(".company04 .article[layer='" + layerNo + "']").removeClass('hover');
    }
  );

  
  $(".company04 .btn_layer, .company04 .article").click(function() {
    var no = $(this).attr("layer");
    layer_open(no);
  
    $('.tablinks, .article').removeClass('active');
    $(".btn_layer[layer='" + no + "']").closest('.tablinks').addClass('active');
    $(".article[layer='" + no + "']").addClass('active');
  });
  
  $(".world-layer-close").click(function() {
    var layerNo = $(this).closest(".world-layer").attr("layer");
    $(".world-layer[layer='" + layerNo + "']").removeClass('open').hide();
    // $(".btn_layer[layer='" + layerNo + "']").closest('.tablinks').removeClass('active');
    // $(".article[layer='" + layerNo + "']").removeClass('active');
  });
  


  // //닫기 버튼 클릭시 레이어 닫기
  // $(".close-btn").click(function () {
  //   layer_close();
  // });


  

  const cont = gsap.utils.toArray('.cont')
  gsap.set(cont,{y: '25%', opacity: 0})
  cont.forEach(cont => {
    gsap.to(cont,{
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      stagger: 0.3,
      scrollTrigger: {
        trigger: cont,
        start: 'top 70%',
        toggleActions:"restart none none reverse"
      }
    })
  })



  ScrollTrigger.refresh();
  window.addEventListener("resize", ScrollTrigger.update);
  ScrollTrigger.refresh();



});





document.addEventListener("DOMContentLoaded", function () {
  var e = document.querySelector('.txt-motion2 .challenge'); // 전역 변수에 값 할당
  if (e) {
    var n = e.querySelector(".ment");
    var r = [].slice.call(n.querySelectorAll("span"));
    

    let o;  

    const areaHeight = window.innerHeight || document.documentElement.clientHeight;
  
    const l = gsap.timeline({ paused: true });
  
    r.forEach((c, h) => {
        l.to(c, {
            opacity: 1,
            duration: .5,
            ease: "power2.inOut"
        });
  
        if (h !== r.length - 1) {
            l.to(r[h + 1], {
                opacity: 0.4,
                duration: .5,
                delay: 0.1,
                ease: "power2.inOut"
            }, "-=0.4");
        }
    });
  
    const onScroll = () => {
        const h = e.getBoundingClientRect();
        const overlay = document.querySelector(".bg-darken");
        const overlayScale = document.querySelector(".bg");
  
        if (h.top < areaHeight && h.bottom > 0) {
            const d = -h.top/o;
            l.progress(Math.min(d, 1));
  
            const overlayOpacity = Math.min(d * 0.65, 0.65); 
            overlay.style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity})`;
            overlayScale.style.transform = `scale(${1 + overlayOpacity * 0.85})`;
        }
    };
  
    const onResize = () => {
        o = e.offsetHeight - areaHeight;
    };
  
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
  
    // 초기화
    onResize();  // 여기에서 onResize를 호출하여 o의 초기 값을 설정합니다.
  
  
  }


  let hasUserInteracted = false;

  // 사용자 상호작용을 감지하는 이벤트 리스너를 추가합니다.
  document.addEventListener('click', () => hasUserInteracted = true, { once: true });

  let videoObserver = new IntersectionObserver((entries, videoObserver) => {
    entries.forEach(entry => {
      const video = entry.target;

      if (entry.isIntersecting && hasUserInteracted) {
        video.play().catch(e => console.error("비디오 재생 실패:", e));
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.subPage .video-wrap video').forEach(video => {
    videoObserver.observe(video);
  });


  // let videoObserver = new IntersectionObserver((entries, videoObserver) => {
  //   entries.forEach(entry => {
  //       // entry.target은 이미 video 요소입니다.
  //       const video = entry.target;

  //       if (entry.isIntersecting) {
  //           video.play();
  //       } else {
  //           video.pause();
  //       }
  //   });
  // }, { threshold: 0.5 }); // 요소가 50% 이상 보일 때 콜백 함수가 실행되도록 설정

  // // 모든 .video-wrap 내의 video 요소에 대해 observer를 적용합니다.
  // document.querySelectorAll('.video-wrap video').forEach(video => {
  //   videoObserver.observe(video);
  // });




});






$(document).ready(function() {
  var swiperInstances = [];

  $('.project-slide').each(function(index) {
    var $this = $(this);
    $this.addClass('swiper-slider-' + index);

    var freeMode = $this.data('free-mode') ? true : false;
    var loop = $this.data('loop') ? true : false;
    var slidesDesktop = $this.data('slides-desktop') || 1;
    var slidesTablet = $this.data('slides-tablet') || 1;
    var slidesMobile = $this.data('slides-mobile') || 1;
    var spaceBetween = $this.data('space-between') || 20;

    var swiper = new Swiper('.swiper-slider-' + index, {
      direction: 'horizontal',
      loop: loop,
      speed: 500,
      autoplay: false, // 초기에는 autoplay 비활성화
      freeMode: $this.data('free-mode') ? true : false,
      spaceBetween: $this.data('space-between') || 20,
      breakpoints: {
        1920: {
          slidesPerView: $this.data('slides-desktop') || 1
        },
        1085: {
          slidesPerView: $this.data('slides-tablet') || 1
        },
        768: {
          slidesPerView: $this.data('slides-mobile') || 1
        }
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    });

    swiperInstances[index] = swiper; // Swiper 인스턴스 저장
  });

  var observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  var observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      let swiperIndex = $(entry.target).index('.project-slide');
      let swiper = swiperInstances[swiperIndex];

      if (entry.isIntersecting) {
        swiper.autoplay.start(); // 화면에 나타나면 autoplay 시작
      } else {
        swiper.autoplay.stop(); // 화면에서 사라지면 autoplay 정지
        swiper.slideTo(0, 0); // 첫 번째 슬라이드로 리셋 (두 번째 인자는 속도, 0으로 설정하면 즉시 전환)
      }


      // if (entry.isIntersecting) {
      //   let swiperIndex = $(entry.target).index('.project-slide');
      //   swiperInstances[swiperIndex].autoplay.start();
      // }
    });
  }, observerOptions);

  $('.project-slide').each(function() {
    observer.observe(this);
  });
});
