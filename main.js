window.onload = init;

var icons = {
    'lock': 'fa-solid fa-lock',
    'tiktok': 'fa-brands fa-tiktok',
    'gift': 'fa-solid fa-gift',
    'twitter': 'fab fa-twitter',
    'discord': 'fa-brands fa-discord',
    'instagram': 'fab fa-instagram',
    'youtube': 'fa-brands fa-youtube',
    'kick': 'fa-brands fa-kickstarter-k',
    'twitch': 'fa-brands fa-twitch',
    'facebook': 'fa-brands fa-facebook'
}

function init(){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'TextFields.txt', false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                const arr = allText.split('\n');
                console.log(arr);
                populateHTML(arr);
            }
        }
    }
    rawFile.send(null);
}

function populateHTML(arr) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].startsWith('#'))  {
            continue;
        }
        var str = arr[i];
        var content = [];
        var x =''
        for(let j = 0; j < str.length; j++) {
            if(str[j] == '[')   {
                x = '';
            }
            else if(str[j] == ']')  {
                content.push(x);
            }
            else{
                x += str[j];
            }
        }
        if(content.length != 3) {
            console.log('Error in text file processing, could not add link. Ensure brackets are correctly placed.')
        }
        else {
            content[0] = content[0].toLowerCase().replaceAll(' ', '');

            const link = document.createElement('a');
            link.setAttribute('class', 'link');
            link.href = content[2];

            const left = document.createElement('p');
            left.setAttribute('class', 'left');
            const icon = document.createElement('i');
            icon.setAttribute('class', icons[content[0]]);
            left.insertAdjacentElement('afterbegin', icon);
            link.appendChild(left);

            const middle = document.createElement('p');
            middle.setAttribute('class', 'center');
            middle.innerHTML = content[1];
            link.appendChild(middle);

            const right = document.createElement('p');
            right.setAttribute('class', 'right');
            right.innerHTML = '&nbsp;';
            link.appendChild(right);
        
            const links = document.getElementById('links');
            links.appendChild(link);
        }
    }
}