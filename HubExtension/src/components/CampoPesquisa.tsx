import React, { useState } from 'react';
import Input from '../components/input';

const CampoPesquisa: React.FC = () => {
    const [valorInput, setValorInput] = useState<string>('');

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValorInput(event.target.value);
    };

    return (
        <div className="w-full h-[60px] bg-black flex items-center justify-center">
            <div className="w-[400px] gap-[5px]">
                <Input
                    type="text"
                    placeholder="Pesquise um Filme"
                    hasText
                    left
                    height={40}
                    value={valorInput}  
                    onChange={handleInputChange}  
                />
            </div>
        </div>
    );
}

export default CampoPesquisa;
