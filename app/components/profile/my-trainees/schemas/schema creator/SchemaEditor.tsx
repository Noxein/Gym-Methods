import ActionsButtons from "./ActionsButtons";
import BasicData from "./BasicData";
import ModalsHolder from "./ModalsHolder";
import Plans from "./Plans";

type SchemaEditorProps = {

}

function SchemaEditor({ }: SchemaEditorProps) {
    
    return ( 
        <div className="mb-40 mt-5 relative">
            <BasicData />

            <Plans/>

            <ActionsButtons />

            <ModalsHolder />
        </div>
     );
}

export default SchemaEditor;