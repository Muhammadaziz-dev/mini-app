import { useToast as useToastOriginal } from "../components/ui/use-toast"

export const toast = (props) => {
    const { toast: addToast } = useToastOriginal()
    return addToast(props)
}

