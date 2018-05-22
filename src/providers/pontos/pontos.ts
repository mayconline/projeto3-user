
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';



@Injectable()
export class PontosProvider {
  user:any
  quantPontos:number
  valor:number

  private PATH = 'pontosGerais/';

  constructor( private afDb:AngularFireDatabase) {
    
  }


  getAllNome(){
    
    return this.afDb.list(this.PATH, ref=> ref.orderByChild('nota'))
    .snapshotChanges()
    .map(changes =>{
        return changes.map(p =>({ key: p.payload.key,...p.payload.val() }));


    })
  

}


/*// atualiza pontos do usuario ao resgatar um produto 
atualizaPonto(user){
  return new Promise((resolve, reject) => {

          this.afDb.list('userProfile/')
            .update(this.user.key, {pontos: this.user.pontos})
            .then(()=> resolve())
            .catch((e)=> reject(e));
    
  });

};*/

/*calcQuantPontos(valor){
  return this.ponto.quantPontos = this.valor / 10
}
*/

/*insertPontos(quantPontos){
  

  return this.user.pontos = this.user.pontos + quantPontos

};*/
//


save(ponto:any){
  return new Promise((resolve, reject) => {
    

    if(ponto.key) {
          this.afDb.list(this.PATH)
            .update(ponto.key, {nota: ponto.nota, valor: ponto.valor, cpf:ponto.cpf, quantPontos : ponto.quantPontos, 
                                            status: ponto.status})
            .then(()=> resolve())
            .catch((e)=> reject(e));
    }else{
          this.afDb.list(this.PATH)
            .push({nota: ponto.nota, 
              valor: ponto.valor, 
              cpf:ponto.cpf, 
              quantPontos : ponto.quantPontos, 
              Userkey:ponto.Userkey,
              NomeUser:ponto.NomeUser,
            status: ponto.status})
            .then(()=> resolve());
            


    }
  });

}

remove(key:string){
  return this.afDb.list(this.PATH).remove(key);

}




}