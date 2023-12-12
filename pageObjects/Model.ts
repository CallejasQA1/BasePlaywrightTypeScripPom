import { Expect,Locator, Page, expect, } from "@playwright/test";
//configuarcion de tiempo deseado
const tie =500

const sleep = (ms)=> {
    return new Promise(resolve => setTimeout(resolve, ms));
};
export class PTS{
    readonly page: Page;
    //contructos de la clase
    constructor(page: Page){
        this.page = page; 
    }
    //Abril la url que resive como parametro
    async OpenUrl(url, tiempo=tie){
        await this.page.goto(url)
        await sleep(tiempo)
    }
    //Configuracion de tiempo de espera segun la variable tie
    async Tiempo(tiempo=tie){
        await sleep(tiempo);
    } 
    //Dar Scroll por cordenadas x, y
    async Scroll(x:number, y:number, tiempo=tie){
        await this.page.mouse.wheel(x,y)
        await sleep(tiempo)
    }
    //validar la etiqueta titulo de la pagina web 
    async Validar_Titulo(titulo:string, tiempo=tie){
        await expect(this.page).toHaveTitle(titulo);
        await sleep(tiempo);
    }
    //Valdar la url de la pagina web    
    async Validar_Url(url:string, tiempo=tie){
        await expect(this.page).toHaveURL(url);
        await sleep(tiempo);
    }
    //Valida un texto resibe como parametros selector y texto a validar
    async Validar_Texto(seletor:string, val: string, tiempo=tie){
        const locator = this.page.locator(seletor);
        await expect(locator).toContainText(val);
        await sleep(tiempo);
    }
    //Ecribe un un campo tipo text, pide como parametros selector, texto   
    async Escribir_Texto(selector:string,val:string,tiempo=tie){
        const valor = this.page.locator(selector);//guardar el dato en una variable
        await expect (valor).toBeVisible();//valida que el campo sea visible
        await expect (valor).toBeEnabled();//valida que el campo este habilitado
        await expect(valor).toBeEmpty();//valida que el campo está vacío
        await valor?.focus();
        await valor?.fill(val);//escribir el valor
        await sleep(tiempo)
    } 
    async Escribir_Texto_label(selector:string,val:string,tiempo=tie){
        const valor = this.page.getByLabel(selector);//guardar el dato en una variable
        await expect (valor).toBeVisible();//valida que el campo sea visible
        await expect (valor).toBeEnabled();//valida que el campo este habilitado
        await expect(valor).toBeEmpty();//valida que el campo está vacío
        await valor?.focus();
        await valor?.fill(val);//escribir el valor
        await sleep(tiempo)
    } 
    //Da click en un boton pide como parametro nombre del boton
    async Click_Boton(texto:string,tiempo=tie){
        const sel = await this.page.getByRole('button', { name: texto, exact:true }).click();
        await sleep(tiempo)
    } 

    //Da chekc
    async Check(texto:string,tiempo=tie){
        const sel = await this.page.getByLabel(texto).check();
        await sleep(tiempo)
    } 
    //Refrezca la pagina web
    async Refrescar_Pagina(tiempo=tie){
        await this.page.reload();
        await sleep(tiempo);
    } 
    //selecciona un elemento de un campo lista desplegable cuando es ...Seleccione uno, pide como parametro selector, y nombre de opcion a seleccionar
    async SeleccioneUno(identificardor:string, optcion:string, tiempo=tie){
        await this.page.locator(identificardor+' '+'div').filter({ hasText: '...Seleccione uno' }).nth(1).click();
        await this.page.getByRole('option', { name: optcion }).click();
        await sleep(tiempo);
    } 
    //para dar tabulador en un campo
    async Tab(selector: string,tiempo=tie){
        const sel = await this.page.locator(selector)
        await sel.press("Tab")
        await sleep(tiempo);
    } 
    ///catura pantalla 
    async Screenshot(ruta: string,tiempo=tie){
        await this.page.screenshot({path:ruta})
        await sleep(tiempo);
    }
    //Captura de pantalla completa 
    async Screenshot_Full(ruta: string,tiempo=tie){
        await this.page.screenshot({path:ruta, fullPage: true})
        await sleep(tiempo);
    }
    //Captuara pnatalla a campo en especial
    async Screenshot_Elemento(selector: string, ruta: string,tiempo=tie){
        const sel = await this.page.locator(selector)
        await this.page.screenshot({path:ruta})
        await sleep(tiempo);
    }
      
}