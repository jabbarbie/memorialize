interface ParamLine {
    type?: 'h1' | 'li' | 'p'
    value: string
    prefix: string
}

const convertLine = (params: ParamLine) => {
    const { type, value, prefix } = params
    let className = ''
    let final_prefix = prefix

    if (type == 'h1') {
        className = 'text__h1'
        final_prefix = ''
    } else if (type == 'li') {
        className = 'text__li'
        final_prefix = final_prefix
    }

    return (
        <div className="line">
            <p className="line__prefxix">{final_prefix}</p>
            <p className={className}>{value} <br /></p>
        </div>
    )
}
const formatText = (text: string) => {
    if (!text || text.length == 0) return
    let li_counter = 0;
    let prefix = '';
    return text.split('\n').map((line, index) => {
        if (line.trim().startsWith('#')) {
            li_counter = 0
            return convertLine({ prefix: prefix, value: line.slice(1).toUpperCase(), type: 'h1' })
        } else if (line.trim().startsWith('-')) {
            li_counter += 1
            return convertLine({ prefix: (li_counter - 1 + 1).toString(), value: line.slice(1).toUpperCase(), type: 'li' })
        }
        else {
            li_counter = 0
            return convertLine({ prefix: prefix, value: line })
            // return <div><div>{index}</div><div key={index}>{line}<br /></div></div>;
        }
    });
};


export {
    formatText
}