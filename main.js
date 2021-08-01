var pr1 = "";
var pr2 = "";

camera = document.getElementById("camera");
Webcam.set({
    width:350,
    height:300,
    image_format:'jpeg',
    jpeg_quality:90
})
Webcam.attach(camera);

function Capture()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id ="selfie_image" src="'+data_uri+'"/>';
    });
}
var classifier =ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xJqlS7UU8/model.json',model_loaded);
function model_loaded()
{
    console.log("Model has been loaded");
}
function Identify()
{
    var image = document.getElementById("selfie_image");
    classifier.classify(image , Gotresult );
}
function Gotresult(error,results)
    {
        if(error)
        {
            console.error(error);
        }
        else{
            console.log(results);
            pr1 = results[0].label
            pr2 = results[1].label;
            document.getElementById("result_emotion_name").innerHTML= results[0].label;
            document.getElementById("result_emotion_name2").innerHTML= results[1].label;
            if(pr1 == "Happy" )
            {
               document.getElementById("Emoji1").innerHTML = "&#128512;";
            }
            if(pr1 == "Sad" )
            {
                document.getElementById("Emoji1").innerHTML = "&#128546;";
            }
             if(pr1 == "Angry" )
             {
                document.getElementById("Emoji1").innerHTML = "&#128545;";
            }
             if(pr2 == "Happy" )
             {
                document.getElementById("Emoji2").innerHTML = "&#128512;";
            }
             if(pr2 == "Sad" )
             {
                 document.getElementById("Emoji2").innerHTML = "&#128546;";
            }
              if(pr2 == "Angry" )
              {
                 document.getElementById("Emoji2").innerHTML = "&#128545;";
            }
            speak()
        }
    }
    function speak()
    {
       var synth = window.speechSynthesis;
       
       speak_data = "The first prediction is" + pr1;
       speak_data2 = "The second prediction is" + pr2;
    
       var utterThis = new SpeechSynthesisUtterance(speak_data+speak_data2);
       
       synth.speak(utterThis);
    }
