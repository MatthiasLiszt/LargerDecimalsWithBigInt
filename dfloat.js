function dFloat(init=0){
 this.maxSize=32;	 
 this.infinity=false;
 this.nan=false;
 if(init===0){	
  this.exponent=0n;
  this.significand=0n; 
 } else {   
   if(typeof init !== 'string')
    {let exponent=0n;
     while(Math.floor(init)!==init)	 
      {init*=10;
       --exponent;
      }
     this.exponent=exponent;
     this.significand=BigInt(init);
    }  	
   else
   {if(init.indexOf('.')<0){
	 this.significand=BigInt(init);
      this.exponent=0n;
    } else {
	 this.exponent=BigInt(init.split('.')[1].length*-1);	
	 this.significand=BigInt(init.split('.')[0]+init.split('.')[1]);	 
	}	 		
   }	   
 } 
 this.add=(x)=>{if(x.significand===undefined)
	             {console.log('not a dFloat !!!');
			      return;
			     }
			    else
				{const back = new dFloat();
				 if(this.exponent===x.exponent)						
			  	  {const result = this.significand+x.significand;			       
			       back.exponent = x.exponent;
				   back.significand = result;
				   return back;
                  }	 
				 let exponent;
                 let significand;				 
                 if(x.exponent<this.exponent)				  
				 {significand=this.significand;
			      for(var i=this.exponent;i>x.exponent;--i)
				   {significand*=10n;}	  
			      const result = significand+x.significand;
				  back.exponent = x.exponent;
				  back.significand = result;
				  return back;
				 }
                 if(x.exponent>this.exponent)				  				 {
			      significand=x.significand;
			      for(var i=x.exponent;i>this.exponent;--i)
				   {significand*=10n;}	  
			      const result = significand+this.significand;
				  back.exponent = this.exponent;
				  back.significand = result;
				  return back;				  
				 }				 
				}	
               };	
 this.mult = (x) => {
 	if(x.significand===undefined){
		console.log('not a dFloat !!!');
		return;
	} else {
		const back = new dFloat();		
        let exponent;
        let significand=this.significand;				 
        const result = significand*x.significand;
		back.exponent = x.exponent + this.exponent;
		back.significand = result;
		return back;		
	} 
 };			   
 this.inverse = () => {
		const back = new dFloat();
		if(this.significand===0){
	     back.infinity=true;	
		 back.exponent=0n;
		 back.significand=0n;
		 return back;
	    }
        let check=this.significand;
        let significand=1n*(10n**BigInt(this.maxSize));
        let exponent=BigInt(this.maxSize)*(-1n);
	    while(check>0n){   		
	        significand*=10n;
	        check/=10n; 
		    --exponent;
	    }	
	    const result = significand / this.significand;		
		back.significand = result;
		back.exponent = exponent;
		return back;		
 };
 this.mod = (x) => {	
	const back = new dFloat();
	if(x.significand===undefined){
		console.log('not a dFloat !!!');
		return;
	} 
	if(x.significand===0n){
	    back.nan=true;	
		back.exponent=0n;
		back.significand=0n;
		return back;
	} 
	if(this.significand===0n){	   
		back.exponent=0n;
		back.significand=0n;
		return back;
	}
	let exponent;
    let significand;
    if(x.exponent===this.exponent){	
	 significand=this.significand;
	 const result = significand%x.significand;
	 back.exponent = this.exponent;
	 back.significand = result;
	 return back;				  
	}	
    if(x.exponent<this.exponent){	        
	    significand=this.significand;
		for(var i=this.exponent;i>x.exponent;--i)
		{significand*=10n;}	  
	    const result = significand%x.significand;
		back.exponent = x.exponent;
		back.significand = result;
		return back;
	}
    if(x.exponent>this.exponent){		
		significand=x.significand;
		for(var i=x.exponent;i>this.exponent;--i)
		 {significand*=10n;}	  
		const result = this.significand%significand;
		back.exponent = this.exponent;
		back.significand = result;
	    return back;				  
	}				 
 };
 this.absolute=()=>{
  return (this.exponent<0n)?(this.exponent*-1n):this.exponent;	  
 };
 this.toString=()=>{var x=this;
	                if(x.significand===undefined)
	                  {console.log('not a dFloat !!!');
			           return;
			          }
	                 if(x.exponent===0n)	  
	                  {const significand=x.significand;
					   return significand.toString();
					  } else {
					   const value=x.significand.toString();
					   const length=BigInt(value.length);
					   if(length>=this.absolute()){					    
                        const precomma=value.substring(0,Number(length+x.exponent));
                        const postcomma=value.substring(Number(length+x.exponent),Number(length));
						if(precomma===''){						
						 return '0.'+postcomma;
						} else {	
                          return precomma+'.'+postcomma; 
						}  
					   } else {
						const precomma='0.';   
						const array=new Array(Number(this.absolute())-value.length+1);
						const postcomma=array.join('0');
						return precomma+postcomma+value;
					   }	
					  } 
 };
 this.shorten=()=>{
	 const back=new dFloat();
	 const current=this.significand.toString().length;
	 if(current>this.maxSize)
      {const difference=current-this.maxSize;
	   const value=this.significand/BigInt(10n**BigInt(difference));     
       this.exponent+=BigInt(difference);
       this.significand=value;
	   back.exponent=this.exponent;
       back.significand=this.significand;
       return back;	       
      }	     
    back.exponent=this.exponent;
    back.significand=this.significand;
    return back;	
 };
}