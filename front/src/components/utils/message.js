function timeSince(date) {

    var seconds = Math.floor((new Date().getTime() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    } 
    return "just now";
}

export const outputMessage = (message , state)=>{
    const div = document.createElement('div');
    div.classList.add('message');
    if(message.username==state.user){
        div.classList.add('right');
    }
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.username+" ";
    div.appendChild(p);

    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
    const lineBreak = document.createElement('br');
    div.appendChild(lineBreak);
    const pp = document.createElement('p');
    pp.classList.add('meta');
    pp.innerHTML = `<span>${timeSince(message.time)}</span>`;
    div.appendChild(pp);
}


export const adjust = (message)=>{
    let lines = message.split("\n") ; 
    let result=""
    for (let i = 0; i < lines.length; i++) {
        if(lines[i].length>0){
            lines[i] = lines[i].replace(/\s+/g, ' ').trim() ; 
            if(lines[i]!=" " && lines[i]!=""){
                result = result +" "+ lines[i]
            }
        }
    }
    return result
}