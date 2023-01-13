import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  actionBtn: string = 'Save'

  productForm !: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>) {  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      cnpj: ['', Validators.required],
      razao_social: ['', Validators.required],
      nome_fantasia: ['', Validators.required],
      capital_social: ['', Validators.required],
      site: ['', Validators.required],
      mercado: ['', Validators.required],
      cnae_fiscal: ['', Validators.required],
      cnae_fiscal_descricao: ['', Validators.required],
      email: ['', Validators.required],
      ddd_telefone_1: ['', Validators.required],
      street: ['', Validators.required],
      numero: ['', Validators.required],
      cep: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      complemento: ['', Validators.required],
      nome_socio: ['', Validators.required],
      qualificacao_socio: ['', Validators.required],
      data_entrada_sociedade: ['', Validators.required]

    })
    if(this.editData){
      this.actionBtn= 'Update';
      this.productForm.controls['cnpj'].setValue(this.editData.cnpj);
      this.productForm.controls['razao_social'].setValue(this.editData.razao_social);
      this.productForm.controls['nome_fantasia'].setValue(this.editData.nome_fantasia);
      this.productForm.controls['capital_social'].setValue(this.editData.capital_social);
      this.productForm.controls['site'].setValue(this.editData.site);
      this.productForm.controls['mercado'].setValue(this.editData.mercado);
      this.productForm.controls['cnae_fiscal'].setValue(this.editData.cnae_fiscal);
      this.productForm.controls['cnae_fiscal_descricao'].setValue(this.editData.cnae_fiscal_descricao);
      this.productForm.controls['email'].setValue(this.editData.email);
      this.productForm.controls['ddd_telefone_1'].setValue(this.editData.ddd_telefone_1);
      this.productForm.controls['street'].setValue(this.editData.street);
      this.productForm.controls['numero'].setValue(this.editData.numero);
      this.productForm.controls['cep'].setValue(this.editData.cep);
      this.productForm.controls['neighborhood'].setValue(this.editData.neighborhood);
      this.productForm.controls['city'].setValue(this.editData.city);
      this.productForm.controls['state'].setValue(this.editData.state);
      this.productForm.controls['complemento'].setValue(this.editData.complemento);
      this.productForm.controls['nome_socio'].setValue(this.editData.nome_socio);
      this.productForm.controls['qualificacao_socio'].setValue(this.editData.qualificacao_socio);
      this.productForm.controls['data_entrada_sociedade'].setValue(this.editData.data_entrada_sociedade);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value).subscribe({
          next:(res)=>{
            alert("Product added sucessfully!")
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the product")
          }
        })
      }
    }else {
      this.updateProduct()
    }
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Product updated Succesfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert("Error while updating the record")
      }
    })
  }

}
