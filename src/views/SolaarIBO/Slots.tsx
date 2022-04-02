import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import $ from 'jquery'
import BondsOne from 'src/assets/ibo/bond3.png';
import BondsTwo from 'src/assets/ibo/bond2.png';
import BondsThree from 'src/assets/ibo/bond1.png';

const SlotsWrap = styled.div`
  .marqueeElement {
    height:200px;
    width:400px;
    color: #ccc;
    position:absolute;
    img {
      width: 100%;
    }
  }
  
  .mholder {
    height: 100%;
    width:400px;
    position: relative;
    overflow: hidden;
    float:left;
  }
  
  .clear {
    clear:both;
  }
`;

export default function Slots(){
  useEffect(() => {
    $(document).ready(function() {

      $(".marqueeElement").last().addClass("last");
      $(".mholder").each(function() {
        var i = 0;
        $(this).find(".marqueeElement").each(function() {
          var $this = $(this);
          $this.css("left", i);
          i += $this.width();
        });
      });

      $('#start').click(function() {
        var countScrolls = $('.mholder .marqueeElement').length;

        for (var i=1; i <= 3; i++) {
          doScroll($('.mholder .marqueeElement:nth-child(' + i + ')'));
        }
      });
    });

    function doScroll($ele) {
      // @ts-ignore

      var top = parseInt($ele.css("left"));
      if (top < -200) { //bit arbitrary!
        var $lastEle = $ele.closest('.mholder').find(".last");
        $lastEle.removeClass("last");
        $ele.addClass("last");
        var top = (parseInt($lastEle.css("left")) + $lastEle.width());
        $ele.css("left", top);
      }
      console.log(window.id, $ele.data('id'), '$ele.data(\'id\')');
      if (window.id !== undefined) {
        if (window.id === $ele.data('id')) {
          $ele.animate({
            left: (parseInt(top) - 400)
          }, 1000);
        }
        return;
      }

      $ele.animate({
        left: (parseInt(top) - 400)
      }, 1000, 'linear', function() {
        doScroll($(this))
      });
    }

    window.doScroll = doScroll
  }, [])

  return (
    <SlotsWrap>
      <div className="mholder">
        <div className="marqueeElement" data-id="1">
          <img src={BondsOne} alt="" />
        </div>
        <div className="marqueeElement" data-id="2">
          <img src={BondsTwo} alt="" />
        </div>
        <div className="marqueeElement last" data-id="3">
          <img src={BondsThree} alt="" />
        </div>
        {/*<div className="marqueeElement last">4th</div>*/}
      </div>
      {/*<div className="mholder">*/}
      {/*  <div className="marqueeElement">1st</div>*/}
      {/*  <div className="marqueeElement">2nd</div>*/}
      {/*  <div className="marqueeElement">3rd</div>*/}
      {/*  <div className="marqueeElement last">4th</div>*/}
      {/*</div>*/}
      {/*<div className="mholder">*/}
      {/*  <div className="marqueeElement">1st</div>*/}
      {/*  <div className="marqueeElement">2nd</div>*/}
      {/*  <div className="marqueeElement">3rd</div>*/}
      {/*  <div className="marqueeElement last">4th</div>*/}
      {/*</div>*/}
      <div className="clear"></div>
      <p><a href="#" id="start">start</a></p>

            {/*<li><img src={BondsOne} alt="" /></li>*/}
            {/*<li><img src={BondsTwo} alt="" /></li>*/}
            {/*<li><img src={BondsThree} alt="" /></li>*/}
    </SlotsWrap>
  );
};