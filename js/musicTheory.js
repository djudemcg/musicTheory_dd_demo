 var MusicTheory = {

     chordKey: null,
     chordType: null,
     // keys including enharmonics
     keys: [{
         name: "C",
         index: 0
     }, {
         name: "C#",
         index: 1
     }, {
         name: "Db",
         index: 1
     }, {
         name: "D",
         index: 2
     }, {
         name: "D#",
         index: 3
     }, {
         name: "Eb",
         index: 3
     }, {
         name: "E",
         index: 4
     }, {
         name: "F",
         index: 5
     }, {
         name: "F#",
         index: 6
     }, {
         name: "Gb",
         index: 6
     }, {
         name: "G",
         index: 7
     }, {
         name: "G#",
         index: 8
     }, {
         name: "Ab",
         index: 8
     }, {
         name: "A",
         index: 9
     }, {
         name: "A#",
         index: 10
     }, {
         name: "Bb",
         index: 10
     }, {
         name: "B",
         index: 11
     }],
     // Chords by type and semitones		 
     chords: [{
         type: "maj",
         spelling: [0, 4, 7]
     }, {
         type: "min",
         spelling: [0, 3, 7]
     }, {
         type: "aug",
         spelling: [0, 4, 8]
     }, {
         type: "dim",
         spelling: [0, 3, 6]
     }, {
         type: "maj7",
         spelling: [0, 4, 7, 11]
     }, {
         type: "min7",
         spelling: [0, 3, 7, 10]
     }, {
         type: "sus2",
         spelling: [0, 2, 7]
     }, {
         type: "sus4",
         spelling: [0, 5, 7]
     }, {
         type: "add9",
         spelling: [0, 4, 7, 2]
     }]

 };


 $(document).ready(function() {

     $('#keySelect').on('change', function(e) {
         $('#keySelect option[value=""]').remove();
         MusicTheory.chordKey = e.target.value;
         MusicTheory.buildChordName();
     });

     $("#chordTypeSelect").on('change', function(e) {
         $('#chordTypeSelect option[value=""]').remove();
         MusicTheory.chordType = e.target.value;
         MusicTheory.buildChordName();
     });

     MusicTheory.buildChordName = function() {

         if ((this.chordKey != null) && (this.chordType !== null)) {
             this.displayChord(this.chordKey, this.chordType);
         }


     };

     MusicTheory.displayChord = function(key, chordType) {
         var displayString = '';

         displayString = MusicTheory.getChord(key, chordType);

         $('.chordTones').html(displayString);
     };


     MusicTheory.getChord = function(keysig, type) {


         var scale = this.generateDiatonicScale(this.chordKey);
         var chordNotes = this.getChordTones(scale, type);
         var chordString = '';

         $.each(chordNotes, function(idx2, val2) {
             chordString += val2 + '  -  ';
         });

         return chordString = chordString.slice(0, -5);


     };



     MusicTheory.generateDiatonicScale = function(key) {

         var scale = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'],
             offset = null;

         for (var i = 0, l = this.keys.length; i < l; i++) {
             var obj = this.keys[i];
             if (obj.name === key) {
                 offset = obj.index;
                 console.log(obj.name + ' matches ' + key + ' with offset of ' + offset);
             }
         }
         //clone keys array
         var diatonicScale = scale.slice(0);
         // now offset it
         diatonicScale = diatonicScale.concat(diatonicScale.splice(0, offset));

         return diatonicScale;
     };

     MusicTheory.getChordTones = function(scale, type) {

         var notes = [],
             recipe = [];

         for (var i = 0, l = this.chords.length; i < l; i++) {
             var obj = this.chords[i];
             if (obj.type === type) {
                 recipe = obj.spelling;
             }
         }

         for (var x in recipe) {
             notes.push(scale[recipe[x]]);
         }

         return notes;

     };


 });