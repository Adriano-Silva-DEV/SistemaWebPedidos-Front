import { Injectable } from "@angular/core";
import { meioPagamento } from "../models/meio-pagamento";

@Injectable()
export class MeioPagamentoService{

    meiosPagamento: meioPagamento[] = [
        {
          id: 0,
          nome: 'Dinheiro ou Pix',
          selecionado: false,
          numMaxParcelamento: 1,
          valorMinParcela: 9999999999,
          img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7MsT24vvFA5FqSn2vhmwjR3IFKLKZvekhOg&usqp=CAU',
        },
        {
          id: 1,
          nome: 'Cartão VISA',
          selecionado: false,
          numMaxParcelamento: 5,
          valorMinParcela: 50,
          img: 'https://w7.pngwing.com/pngs/371/4/png-transparent-visa-debit-card-credit-card-logo-mastercard-visa-text-trademark-logo.png',
        },
        {
          id: 1,
          nome: 'Cartão Master',
          selecionado: false,
          numMaxParcelamento: 10,
          valorMinParcela: 20,
          img: 'https://logosmarcas.net/wp-content/uploads/2020/09/MasterCard-Logo-1990-1996.png',
        },
      ];


    calcularParcelamento(valor, meio) {
        let totalparcelamento :number = valor / meio.valorMinParcela;
    
        if (totalparcelamento < 1) {
          return { totalParcela: 1, valor: valor };
        }
    
        totalparcelamento = Math.trunc(totalparcelamento);
    
        if (totalparcelamento > meio.numMaxParcelamento)
        totalparcelamento = meio.numMaxParcelamento;
    

        return { totalParcela: totalparcelamento , valor: valor / totalparcelamento  };
      }

      
}