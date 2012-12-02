#include <stdio.h>
#define NUN 2

char array[NUN][8]={

	{0b11000011,
	 0b11000011,
	 0b11000011,
	 0b11111111,
	 0b11111111,
	 0b11000011,
	 0b11000011,
	 0b11000011
	},

	{0b00000000,
	 0b00000000,
	 0b00111111,
	 0b00110011,
	 0b00110011,
	 0b00110011,
	 0b00000000,
	 0b00110011
	}
	};




int main(){

	int conc,conb;

		for(conc=0;conc<8;conc++){
			for(conb=7;conb>=0;conb--){
				printf("%d", array[0][conc] >> conb & 0b00000001);

				}
			printf("\n");
			}

return(0);
}



