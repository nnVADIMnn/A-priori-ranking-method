let chi2 = [
            0.00393, 0.103,  0.352,  0.711,  1.145,  1.635,  2.167,  2.733,  3.325,  3.940,
            4.575,   5.226,  5.892,  6.571,  7.261,  7.962,  8.672,  9.390,  10.117, 10.851,
            11.591,  12.388, 13.091, 13.848, 14.611, 15.379, 16.151, 16.928, 17.708, 18.493
            ]

let this_css = {
    window_css:{
        position:'absolute',
        top:'20px',
        left:'20px',
        width:'600px',
        height:'500px',
        borderStyle:'solid',
        borderColor:'black',
        borderWidth:'3px'
    },
    header_css:{
        position:'absolute',
        left:'0px',
        height:'20px',
        width:'100%',
        borderStyle:'solid',
        borderColor:'black',
    },
    name_css:{
        top:'0px',
        backgroundColor:'lightblue',
        textAlign:'center',
        fontWeight:'bold',
        borderWidth:'0px 0px 3px 0px',
    },
    hint_css:{
        top:'23px',
        backgroundColor:'lightpink',
        textAlign:'left',
        fontWeight:'bold',
        fontStyle:'italic',
        borderWidth:'0px 0px 1px 0px',
    },
    sheet_css:{
        position:'absolute',
        top:'43px',
        height:'457px',
        width:'600px',
        overflow:'auto'
    },
    label_css:{
        position:'absolute',
        height:'20px',
    },
    input_css:{
        position:'absolute',
        width:'30px',
        height:'20px',
        borderStyle:'solid',
        borderWidth:'1px',
        borderColor:'black',
        outline:'none',
        padding:'0px'
    },
    submit_css:{
        position:'absolute',
        top:'100px',
        left:'10px',
    },
    cell_css:{
        position:'absolute',
        width:'30px',
        height:'30px',
        borderStyle:'solid',
        borderWidth:'1px',
        borderColor:'black',
        outline:'none',
        padding:'0px',
        textAlign:'center'
    },
    text_css:{
        display:'table-cell',
        width:'30px',
        height:'30px',
        textAlign:'center',
        verticalAlign:'middle',
    },
    graph_css:{
        position:'absolute',
        width:'500px',
        height:'300px',
        top:'40px',
        left:'60px',
        borderStyle:'solid',
        borderWidth:'1px',
        borderColor:'black',
    },
    rectangle_css:{
        position:'absolute',
        backgroundColor:'blue',
        bottom:'0px'
    },
    line_css:{
        position:'absolute',
        backgroundColor:'black',
        height:'1px',
        width:'100%'
    }
}

function add_css(obj, css){
    for(let i in css){
        obj.style[i] = css[i]
    }
}

function sum(num){
    let answer = num
    if(num > 1){
        num--
        answer += sum(num)
    }
    return answer
}

function create_object(type, parent, css){
    let this_obj = document.createElement(type)
    parent.appendChild(this_obj)
    add_css(this_obj, css)
    return this_obj
}

function clean_sheet(sheet){
    for(let i = 0; i < sheet.children.length; i++){
        sheet.children[i].remove()
        i--
    }
}

function draw_final(sheet, hint, sum_rang){
    let graph = create_object('div', sheet, this_css.graph_css)
    hint.innerHTML = 'Ranking results:'
    let max_sum_rang = 0
    for(let i = 0; i < sum_rang.length; i++){
        if(sum_rang[i] > max_sum_rang){
            max_sum_rang = sum_rang[i]
        }
    }
    for(let i = 0; i < sum_rang.length; i++){
        let this_rectangle = create_object('div', graph, this_css.rectangle_css)
        add_css(this_rectangle, {width:((500/((sum_rang.length + 1)*2)) + 'px'), height:((300/max_sum_rang*sum_rang[i]) + 'px'), left:((500/((sum_rang.length + 1)*2) * i * 2 + 500/((sum_rang.length + 1)*2)) + 'px')})
        let this_label = create_object('div', graph, this_css.label_css)
        add_css(this_label, {left:((500/((sum_rang.length + 1)*2) * i * 2 + 500/((sum_rang.length + 1)*2) + (500/((sum_rang.length + 1)*2))/2) + 'px'), bottom:'-20px'})
        this_label.innerHTML = 'F'+(i+1)
    }
    for(let i = 0; i < 7; i++){
        let this_line = create_object('div', graph, this_css.line_css)
        add_css(this_line, {bottom:(50*i)+'px'})
        let this_label = create_object('div', sheet, this_css.label_css)
        add_css(this_label, {bottom:(110 + 50*i)+'px', left:'10px'})
        this_label.innerHTML = Math.round((max_sum_rang / 6) * i * 10) / 10
    }
    let fac_vals = create_object('div', sheet, this_css.label)
    add_css(fac_vals, {position:'absolute', top:'360px'})
    fac_vals.innerHTML = 'Factor values:'
    for(let i = 0; i < sum_rang.length; i++){
        this_label  = create_object('div', sheet, this_css.label)
        add_css(this_label, {position:'absolute',top:((390 + 30*i)+'px')})
        this_label.innerHTML = 'F' + (i+1) + ': ' + sum_rang[i]
    }
}

function calculate(table, sheet, hint){
    console.log('Table:')
    console.log(table)
    let max_val = []
    for(let i = 0; i < table.length; i++){
        max_val[i] = 0
        for(let j = 0; j < table[i].length; j++){
            if(table[i][j] > max_val[i]){
                max_val[i] = table[i][j]
            }
        }
    }
    console.log('Maximum ranks:')
    console.log(max_val)
    let sorted_table = []
    for(let i = 0; i < table.length; i++){
        sorted_table[i] = []
        for(let j = 0; j < table[0].length; j++){
            sorted_table[i][j] = table[i][j]
        }
    }
    for(let i = 0; i < sorted_table.length; i++){
        for(let j = 0; j < sorted_table[0].length; j++){
            for(let k = 0; k < sorted_table[0].length - j; k++){
                if(sorted_table[i][k + 1] < sorted_table[i][k]){
                    let temp = sorted_table[i][k + 1]
                    sorted_table[i][k + 1] = sorted_table[i][k]
                    sorted_table[i][k] = temp
                }
            }
        }
    }
    console.log('Sorted table:')
    console.log(sorted_table)
    let odin_rangs = []
    for(let i = 0; i < sorted_table.length; i++){
        odin_rangs[i] = {}
        for(let j = 0; j < sorted_table[0].length; j++){
            let counter = 0
            for(let k = 0; k < sorted_table[0].length; k++){
                if(sorted_table[i][j] == sorted_table[i][k]){
                    counter++
                    if(k == sorted_table[0].length - 1){
                        odin_rangs[i][sorted_table[i][j].toString()] = counter
                        counter = 0
                    }
                }
                else{
                    odin_rangs[i][sorted_table[i][j].toString()] = counter
                    counter = 0
                    j = k
                    k--
                }
            }
            break
        }
    }
    console.log('Number of identical ranks by ranking:')
    console.log(odin_rangs)
    let nov_rangs = []
    for(let i = 0; i < odin_rangs.length; i++){
        nov_rangs[i] = {}
        let counter = 0
        for(let j in odin_rangs[i]){
            nov_rangs[i][j] = sum(odin_rangs[i][j])/odin_rangs[i][j] + counter
            counter += odin_rangs[i][j]
        }
    }
    console.log('List of new ranks')
    console.log(nov_rangs)
    let svyaz_table = []
    for(let i = 0; i < table.length; i++){
        svyaz_table[i] = []
        for(let j = 0; j < table[i].length; j++){
            for(let k = 1; k < max_val[i] + 1; k++){
                if(table[i][j] == k){
                    svyaz_table[i][j] = nov_rangs[i][k.toString()]
                    break
                }
            }
        }
    }
    console.log('Table with new ranks:')
    console.log(svyaz_table)
    let sum_rang = []
    for(let j = 0; j < table[0].length; j++){
        for(let i = 0; i < table.length; i++){
            if(i == 0){
                sum_rang[j] = 0
            }
            sum_rang[j] = sum_rang[j] + svyaz_table[i][j]
        }
    }
    console.log('Sum of ranks for each factor:')
    console.log(sum_rang)
    let sum_rangs = 0
    for(let i = 0; i < sum_rang.length; i++){
        sum_rangs = sum_rangs + sum_rang[i]
    }
    console.log('Total amount of ranks:')
    console.log(sum_rangs)
    let delta_rang = []
    for(let i = 0; i < sum_rang.length; i++){
        delta_rang[i] = sum_rang[i] - sum_rangs/sum_rang.length
    }
    console.log('The difference between the sum of ranks of each factor and the average sum of ranks:')
    console.log(delta_rang)
    let sum_delta_rang = 0
    for(let i = 0; i < sum_rang.length; i++){
        sum_delta_rang = sum_delta_rang + delta_rang[i]*delta_rang[i]
    }
    console.log('Sum of squared deviations:')
    console.log(sum_delta_rang)
    let odin_rangs_exps = []
    for(let i = 0; i < odin_rangs.length; i++){
        odin_rangs_exps[i] = 0
        for(let j in odin_rangs[i]){
            odin_rangs_exps[i] += odin_rangs[i][j]*odin_rangs[i][j]*odin_rangs[i][j] - odin_rangs[i][j]
        }
    }
    console.log('t^3 - t:')
    console.log(odin_rangs_exps)
    let sum_odin_rangs_exps = 0
    for(let i = 0; i < odin_rangs_exps.length; i++){
        sum_odin_rangs_exps += odin_rangs_exps[i]
    }
    console.log('T:')
    console.log(sum_odin_rangs_exps)
    let konkord = 0
    konkord = (12*sum_delta_rang) / (table.length*table.length*(table[0].length*table[0].length*table[0].length - table[0].length) - table.length*sum_odin_rangs_exps)
    console.log('Concordance coefficient:')
    console.log(konkord)
    if(konkord >= 0.5 || (!konkord && konkord !== 0)){
        let chi2_emp = 0
        chi2_emp = (12*sum_delta_rang) / (table.length*table[0].length*(table[0].length + 1) - (1/(table[0].length - 1))*sum_odin_rangs_exps)
        console.log('Calculated xi2:')
        console.log(chi2_emp)
        let st_svob = 0
        st_svob = table[0].length - 1
        console.log('Degree of freedom:')
        console.log(st_svob)
        let chi2_t = 0
        chi2_t = chi2[st_svob - 1]
        console.log('Theoretical xi2:')
        console.log(chi2_t)
        if(chi2_t <= chi2_emp || (!chi2_emp && chi2_emp !== 0)){
            console.log('The hypothesis about the non-random agreement of expert opinions is accepted')
            draw_final(sheet, hint, sum_rang)
        }
        else{
            alert('The hypothesis about the non-random agreement of expert opinions is not accepted: the resulting xi2 is less than the tabulated one!')
            draw_greeting()
        }
    }
    else{
        alert('There is no consensus among experts!')
        draw_greeting()
    }
}

function draw_table(sheet, hint, exp, fac){
    clean_sheet(sheet)
    hint.innerHTML = 'Enter expert rating values:'
    for(let i = 0; i < exp; i++){
        let exp_cell = create_object('div', sheet, this_css.cell_css)
        add_css(exp_cell, {top:((71 + 31 * i) + 'px'), left:'110px'})
        let exp_text = create_object('div', exp_cell, this_css.text_css)
        exp_text.innerHTML = 'E' + (i + 1)
        for(let j = 0; j < fac; j++){
            if(i == 0){
                let fac_cell = create_object('div', sheet, this_css.cell_css)
                add_css(fac_cell, {top:'40px', left:((141 + 31 * j) + 'px')})
                let fac_text = create_object('div', fac_cell, this_css.text_css)
                fac_text.innerHTML = 'F' + (j + 1)
            }
            let thisCell = create_object('select', sheet, this_css.cell_css)
            add_css(thisCell, {top:((71 + 31 * i) + 'px'), left:((141 + 31 * j) + 'px'), width:'32px', height:'32px'})
            thisCell.id = i + '_' + j
            thisCell.value = 1
            for(let k = 1; k <= fac; k++){
                let thisOption = create_object('option', thisCell, {})
                thisOption.innerHTML = k
            }
        }
    }
    let exp_rows = create_object('div', sheet, this_css.label_css)
    add_css(exp_rows, {top:'70px', left:'30px', fontWeight:'bold'})
    exp_rows.innerHTML = 'Experts'
    let fac_columns = create_object('div', sheet, this_css.label_css)
    add_css(fac_columns, {top:'20px', left:'140px', fontWeight:'bold'})
    fac_columns.innerHTML = 'Factors'
    let submit = create_object('button', sheet, this_css.submit_css)
    add_css(submit, {top:'40px'})
    submit.innerHTML = 'Submit'
    submit.addEventListener('click', function(){
        let table = []
        for(let i = 0; i < sheet.children.length; i++){
            if(sheet.children[i].id){
                if(sheet.children[i].id.split('_')[1] == '0'){
                    table[parseInt(sheet.children[i].id.split('_')[0])] = []
                }
                table[parseInt(sheet.children[i].id.split('_')[0])][parseInt(sheet.children[i].id.split('_')[1])] = parseInt(sheet.children[i].value)
            }
            if(i == sheet.children.length - 1){
                clean_sheet(sheet)
                calculate(table, sheet, hint)
            }
        }
    })
}

function draw_greeting(){
    let window = create_object('div', document.body, this_css.window_css)
    let header = create_object('div', window, this_css.header_css)
    add_css(header, this_css.name_css)
    header.innerHTML = 'A priori ranking method'
    let hint = create_object('div', window, this_css.header_css)
    add_css(hint, this_css.hint_css)
    let sheet = create_object('div', window, this_css.sheet_css)
    hint.innerHTML = 'Enter data to build a table of expert ratings:'
    let exp_label = create_object('div', sheet, this_css.label_css)
    add_css(exp_label, {top:'20px', left:'10px', width:'200px'})
    exp_label.innerHTML = 'Enter the number of experts:'
    let exp_input = create_object('input', sheet, this_css.input_css)
    add_css(exp_input, {top:'20px', left:'211px'})
    let fac_label = create_object('div', sheet, this_css.label_css)
    add_css(fac_label, {top:'60px', left:'10px', width:'200px'})
    fac_label.innerHTML = 'Enter the number of factors:'
    let fac_input = create_object('input', sheet, this_css.input_css)
    add_css(fac_input, {top:'60px', left:'211px'})
    let submit = create_object('button', sheet, this_css.submit_css)
    submit.innerHTML = 'Submit'
    submit.addEventListener('click', function(){
        if(!exp_input.value || !fac_input.value){
            alert('Not all values entered!')
        }
        else if(!Number.isInteger(exp_input.value/1) || !Number.isInteger(fac_input.value/1)){
            alert('Incorrect values entered!')
        }
        else{
            draw_table(sheet, hint, exp_input.value, fac_input.value)
        }
    })
}

function main(){
    draw_greeting()

}
