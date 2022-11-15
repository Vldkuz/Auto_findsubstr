const fs=require('fs');

function Valid_files(Path_str,Path_template)
{
    return fs.existsSync(Path_str) && fs.existsSync(Path_template);
}

function GetFromFile(Path_str,Path_template)
{
    if (Valid_files(Path_str,Path_template)) {
        let str=new String(fs.readFileSync(Path_str,'utf-8'));
        let template= new String(fs.readFileSync(Path_template,'utf-8'));
        return [str,template];
    }
    return -1;
}

module.exports={
    GetFromFile
}