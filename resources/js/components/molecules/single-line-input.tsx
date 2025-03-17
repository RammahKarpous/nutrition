import { Input } from "@headlessui/react";

interface inputType {
    name: string, 
    text: string, 
    type?: string, 
    className?: string,
    errorMessage?: string,
    data: number | string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SingleLineInput({
	name, text, type = "text", className, errorMessage, data, onChange
}: inputType) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name}>{text}</label>
            <Input type={type} name={name} id={name} value={data} onChange={onChange} className={`bg-background-alt rounded p-3 ${className}`} />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
    );
}
