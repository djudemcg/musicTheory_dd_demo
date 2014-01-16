var MusicTheory={notesRegEx:null,accidentalsRegEx:null,chordTypesRegEx:null,chordKey:null,keys:[{name:"C",index:0},{name:"C#",index:1},{name:"Db",index:1},{name:"D",index:2},{name:"D#",index:3},{name:"Eb",index:3},{name:"E",index:4},{name:"F",index:5},{name:"F#",index:6},{name:"Gb",index:6},{name:"G",index:7},{name:"G#",index:8},{name:"Ab",index:8},{name:"A",index:9},{name:"A#",index:10},{name:"Bb",index:10},{name:"B",index:11}],chords:[{type:"maj",spelling:[0,4,7]},{type:"min",spelling:[0,3,7]},{type:"aug",spelling:[0,4,8]},{type:"dim",spelling:[0,3,6]},{type:"maj7",spelling:[0,4,7,10]},{type:"min7",spelling:[0,3,7,10]},{type:"sus2",spelling:[0,2,7]},{type:"sus4",spelling:[0,5,7]},{type:"add9",spelling:[0,3,5]}]};$(document).ready(function(){$("#go").on("click",function(e){MusicTheory.parseChordName($("#chordNameInput").val())});MusicTheory.parseChordName=function(e){var t,n,r;console.log("name: "+e);MusicTheory.notesRegEx=new RegExp("^[CDEFGABcdefgab]");MusicTheory.accidentalsRegEx=new RegExp("(#|##|b|bb)");MusicTheory.chordTypesRegEx=new RegExp("(maj7|maj|min7|min|sus2|sus4|aug|dim|7|M|m|add9)");t=e.match(MusicTheory.notesRegEx);n=e.match(MusicTheory.accidentalsRegEx);r=e.match(MusicTheory.chordTypesRegEx);if(t!==null){t=t[0].toUpperCase();r=this.refineChordType(r)}this.displayChord(t,n,r,e)};MusicTheory.displayChord=function(e,t,n,r){var i="";if(e!==""&&n!==null)i=MusicTheory.getChord(e,t,n);else{i="sorry, we do not know this chord: "+r;$(".chordTones").addClass("error")}$(".chordTones").html(i)};MusicTheory.getChord=function(e,t,n){t!==null?t=t[0]:t="";this.chordKey=e+t;console.log("key: "+this.chordKey+"   type:"+n);var r=this.generateDiatonicScale(this.chordKey);console.log("scale: "+r[0]);var i=this.getChordTones(r,n);console.log("notes: "+i[0]+"  "+i[1]+"  "+i[2]);var s="";$.each(i,function(e,t){s+=t+"  -  "});return s=s.slice(0,-5)};MusicTheory.refineChordType=function(e){var t;Object.prototype.toString.call(e)==="[object Array]"&&(e=e[0]);e===null&&(t="maj");if(e==="M"||"")t="maj";e==="m"&&(t="min");e==="7"&&(t="maj7");e==="m7"&&(t="min7");t===undefined&&(t=e);return t};MusicTheory.generateDiatonicScale=function(e){var t=["C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"],n=null;for(var r=0,i=this.keys.length;r<i;r++){var s=this.keys[r];if(s.name===e){n=s.index;console.log(s.name+" matches "+e+" with offset of "+n)}}var o=t.slice(0);o=o.concat(o.splice(0,n));return o};MusicTheory.getChordTones=function(e,t){var n=[],r=[];for(var i=0,s=this.chords.length;i<s;i++){var o=this.chords[i];o.type===t&&(r=o.spelling)}for(var u in r)n.push(e[r[u]]);return n}});