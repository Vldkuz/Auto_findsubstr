const WorkFile=require('./Input');
let keys=["-n","-t","-a"];
let user_key=[];
let len_p=process.argv.length;
let count;

for (let i = 2; i < len_p-2; ++i) {
    if (keys.includes(process.argv[i]))
    {
        if (process.argv[i]=='-n') {
            count=process.argv[i+1]*1;
            i++;
            continue;
        }
        user_key.push(process.argv[i]);
    }
    else
    {
        console.log("Ошибка в ключе");
    }
}

let Path_str=process.argv[len_p-1];
let Path_template=process.argv[len_p-2];

let temp=WorkFile.GetFromFile(Path_str,Path_template);
if (temp==-1)
{
    console.log("Ошибка в доступе к файлам");
}

let alphab=new Array();

for(let i=0; i<temp[1].length;++i)
{
    alphab[temp[1][i]]=0;
}


del=new Array(temp[1].length+1);
for(j=0;j<=temp[1].length;j++)
{
    del[j]=new Array();
}

for(char in alphab)
{
    del [0] [char]=0
}


for(j=0;j<temp[1].length;j++){

    prev=del[j][temp[1][j]];
    del[j] [temp[1][j]]=j+1;

    for(char in alphab)
    {
        del[j+1] [char]=del [prev] [char];
    }
}

let status_auto=0;
let index_in=[];
let time_s=new Date().getMilliseconds();

for (let i=0;i<temp[0].length;++i)
{
    const char=temp[0][i];
    status_auto=del[status_auto][char] || 0;
    if (status_auto==del.length-1) index_in.push(i-(temp[1].length-1));
    if (index_in.length==count) break;
}

let time=new Date().getMilliseconds()-time_s;

for (let i = 0; i < user_key.length; ++i) {
    if (user_key[i]=='-t') 
    {
        console.log(time);
    }

    if (user_key[i]=="-a")
    {
        let str="  ";
        for (i in alphab)
        {
            str+=i +' ';
        }
        console.log(str);
        for( let j=0; j<=temp[1].length;++j)
        {
            out=new String(j)+ " ";
            for(i in alphab)
            {
                out+=del[j] [i] + " ";
            }
            console.log(out);
        }
    }
}

console.log(index_in);
